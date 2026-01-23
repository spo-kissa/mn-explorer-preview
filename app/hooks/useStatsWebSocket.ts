"use client";

import { useEffect, useRef, useState } from "react";

export type Stats = {
    latestBlockHeight: number;
    indexedBlocks: number;
    totalTransactions: number;
    totalContracts: number;
};

export type StatsMessage = {
    type: "stats.snapshot";
    timestamp: number;
    stats: Stats;
};

type UseStatsWebSocketOptions = {
    url?: string;
    historySeconds?: number;
}

export function useStatsWebSocket(options: UseStatsWebSocketOptions = {}) {
    const { url, historySeconds = 60 } = options;

    const [latest, setLatest] = useState<StatsMessage | null>(null);

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
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(String(event.data)) as StatsMessage;

                if (data.type !== "stats.snapshot") {
                    console.warn("[StatsWS] unknown message type", data);
                    return;
                }

                setLatest(data);
            } catch (e) {
                console.error("[StatsWS] parse error", e, event.data);
            }
        };

        socket.onclose = (event) => {
            console.log("[StatsWS] closed", event.code, event.reason);
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
        latest,
    };
}
