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
}

export interface StatusMessage {
    type: "status.snapshot";
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

    useEffect(() => {
        if (socketRef.current) return;
        
        const wsUrl =
            url ??
            process.env.NEXT_PUBLIC_WS_URL ??
            "ws://localhost:4000/api/v1/ws";

        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("[StatsWS] connected", wsUrl);
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(String(event.data)) as StatusMessage;

                if (data.type !== "status.snapshot") {
                    console.warn("[StatsWS] unknown message type", data);
                    return;
                }

                setStatus(data);
            } catch (e) {
                console.error("[StatsWS] parse error", e, event.data);
            }
        };

        socket.onclose = (event) => {
            console.log("[StatsWS] closed", event.code, event.reason);
            setIsConnected(false);
            socketRef.current = null;
        };

        socket.onerror = (error) => {
            console.error("[StatsWS] error", error);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [url, historySeconds]);

    return {
        status,
        isConnected,
    };
}
