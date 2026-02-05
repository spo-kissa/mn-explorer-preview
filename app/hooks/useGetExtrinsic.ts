'use client';

import { useState, useEffect, useCallback } from "react";
import { Extrinsic } from "@/types/extrinsic";

export interface UseGetExtrinsicByHashResult {
    extrinsic: Extrinsic | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export default function useGetExtrinsic(block_hash: string, hash: string, enabled: boolean = true)
: UseGetExtrinsicByHashResult {
    const [extrinsic, setExtrinsic] = useState<Extrinsic | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchExtrinsic = useCallback(async () => {
        if (!block_hash || !hash || !enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("block_hash", block_hash);
            params.append("hash", hash);

            const response = await fetch(`/api/GetExtrinsic?${params.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setExtrinsic(data);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch extrinsic";
            setError(errorMessage);
            setExtrinsic(null);
        } finally {
            setIsLoading(false);
        }
    }, [block_hash, hash, enabled]);

    useEffect(() => {
        fetchExtrinsic();
    }, [fetchExtrinsic]);

    return {
        extrinsic,
        isLoading,
        error,
        refetch: fetchExtrinsic,
    };
}
