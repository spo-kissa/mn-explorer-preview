"use client";

import { useState, useEffect, useCallback } from "react";

export interface Block {
    height: number;
    hash: string;
    parent_hash: string;
    slot: number;
    timestamp: number;
    tx_count: number;
    state_root: string;
    is_finalized: boolean;
    raw: string;
    author: string;
    protocol_version: number;
    ledger_parameters: string;
}

export interface UseGetBlockOptions {
    hash?: string;
    height?: number;
    enabled?: boolean;
}

export interface UseGetBlockResult {
    block: Block | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export default function useGetBlock(options: UseGetBlockOptions = {}): UseGetBlockResult {
    const { hash, height, enabled = true } = options;
    const [block, setBlock] = useState<Block | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 空文字列をundefinedに変換
    const normalizedHash = hash && hash.trim() ? hash.trim() : undefined;
    const normalizedHeight = height;

    const fetchBlock = useCallback(async () => {
        if (!enabled) return;
        
        if (!normalizedHash && !normalizedHeight) {
            setError("Hash or height is required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            if (normalizedHash) {
                params.append("hash", normalizedHash);
            }
            if (normalizedHeight) {
                params.append("height", normalizedHeight.toString());
            }

            const response = await fetch(`/api/GetBlock?${params.toString()}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setBlock(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch block";
            setError(errorMessage);
            setBlock(null);
        } finally {
            setIsLoading(false);
        }
    }, [normalizedHash, normalizedHeight, enabled]);

    useEffect(() => {
        fetchBlock();
    }, [fetchBlock]);

    return {
        block,
        isLoading,
        error,
        refetch: fetchBlock,
    };
}
