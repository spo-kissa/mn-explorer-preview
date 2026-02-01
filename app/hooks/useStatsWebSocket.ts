"use client";

import { useEffect, useRef, useState } from "react";

export interface RecentBlock {
    height: number;
    hash: string;
    timestamp: number;
    txsCount: number;
}

export interface RecentTransaction {
    hash: string;
    timestamp: number;
    status: string;
    block_height: number;
    index_in_block: number;
}

export interface Stats {
    latestBlockHeight: number;
    indexedBlocks: number;
    totalTransactions: number;
    totalContracts: number;
    totalAddresses: number;
}

export interface StatusMessage {
    type: "stats.snapshot";
    timestamp: number;
    stats: Stats;
    recentBlocks: RecentBlock[];
    recentTransactions: RecentTransaction[];
}

interface UseStatsWebSocketOptions {
    url?: string;
    historySeconds?: number;
}

export default function useStatsWebSocket(options: UseStatsWebSocketOptions = {}) {
    const { url, historySeconds = 60 } = options;

    const [status, setStatus] = useState<StatusMessage | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        
        // 既存の接続がある場合はクリーンアップ
        if (socketRef.current) {
            const existingSocket = socketRef.current;
            // イベントハンドラーを削除
            existingSocket.onerror = null;
            existingSocket.onopen = null;
            existingSocket.onmessage = null;
            existingSocket.onclose = null;
            
            if (existingSocket.readyState === WebSocket.CONNECTING || existingSocket.readyState === WebSocket.OPEN) {
                existingSocket.close();
            }
            socketRef.current = null;
        }
        
        const wsUrl =
            url ??
            process.env.NEXT_PUBLIC_WS_URL ??
            "wss://mn-explorer.net/ws/api/v1";

        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            if (!isMountedRef.current) {
                socket.close();
                return;
            }
            console.log("[StatsWS] connected", wsUrl);
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            if (!isMountedRef.current) return;
            
            try {
                const data = JSON.parse(String(event.data)) as StatusMessage;

                if (data.type !== "stats.snapshot") {
                    console.warn("[StatsWS] unknown message type", data);
                    return;
                }

                setStatus(data);
            } catch (e) {
                console.error("[StatsWS] parse error", e, event.data);
            }
        };

        socket.onclose = (event) => {
            if (!isMountedRef.current) return;
            
            console.log("[StatsWS] closed", event.code, event.reason);
            setIsConnected(false);
            if (socketRef.current === socket) {
                socketRef.current = null;
            }
        };

        socket.onerror = (error) => {
            // 接続確立前のエラーは完全に無視
            const readyState = socket.readyState;
            if (readyState === WebSocket.CLOSED || readyState === WebSocket.CLOSING) {
                return;
            }
            
            if (!isMountedRef.current) return;
            
            if (process.env.NODE_ENV === 'development') {
                console.error("[StatsWS] error", error);
            }
            setIsConnected(false);
        };

        return () => {
            isMountedRef.current = false;
            
            // クロージャで作成したsocketを直接参照
            if (socketRef.current === socket) {
                // エラーハンドラーを削除してから閉じる（エラーイベントを抑制）
                socket.onerror = null;
                socket.onopen = null;
                socket.onmessage = null;
                socket.onclose = null;
                
                // WebSocketの状態をチェック
                const readyState = socket.readyState;
                // OPEN (1) の場合のみ閉じる
                // CONNECTING (0) の場合は、onopenで閉じるようにするため、ここでは閉じない
                // CLOSING (2) や CLOSED (3) の場合は既に閉じられているので何もしない
                if (readyState === WebSocket.OPEN) {
                    try {
                        socket.close();
                    } catch (error) {
                        // エラーは無視（既に閉じられている可能性がある）
                    }
                } else if (readyState === WebSocket.CONNECTING) {
                    // CONNECTING状態の場合は、onopenで閉じるようにする
                    // ただし、onopenは既にnullに設定されているため、接続が確立されても何も起こらない
                    // この場合、WebSocketは自動的に閉じられるか、サーバー側でタイムアウトする
                }
                socketRef.current = null;
            }
        };
    }, [url, historySeconds]);

    return {
        status,
        isConnected,
    };
}
