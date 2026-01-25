"use client";

import { useState, useEffect, useCallback } from "react";
import { Transaction } from "@/lib/db/GetTransactionsByBlockHeight";

export interface UseGetTransactionsByBlockHeightResult {
    transactions: Transaction[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}


export default function useGetTransactionsByBlockHeight(blockHeight: number | null = null) : UseGetTransactionsByBlockHeightResult {
    const [transactions, setTransactions] = useState<Transaction[] | null>(blockHeight ? [] : null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        if (!blockHeight || isNaN(Number(blockHeight))) {
            setError("Block height is required");
            setTransactions(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("blockHeight", blockHeight.toString());

            const response = await fetch(`/api/GetTransactionsByBlockHeight?${params.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTransactions(data);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch Transactions";
            setError(errorMessage);
            setTransactions(null);
        } finally {
            setIsLoading(false);
        }
    }, [blockHeight]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return {
        transactions,
        isLoading,
        error,
        refetch: fetchTransactions,
    }
}
