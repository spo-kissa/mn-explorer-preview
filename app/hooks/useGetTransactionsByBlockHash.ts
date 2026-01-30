"use client";

import { useState, useEffect, useCallback } from "react";
import { Transaction } from "@/types/transaction";

export interface UseGetTransactionsByBlockHashResult {
    transactions: Transaction[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export default function useGetTransactionsByBlockHash(blockHash: string)
 : UseGetTransactionsByBlockHashResult {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = useCallback(async () => {
        const hash = blockHash.trim().toLowerCase();
        if (hash.startsWith("0x")) {
        }
        if (!hash) {
            setError("Block hash is required");
            setTransactions(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("hash", hash);

            const response = await fetch(`/api/GetTransactions?${params.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `HTTP error! status ${response.status}`);
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

    }, [blockHash]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    return {
        transactions,
        isLoading,
        error,
        refetch: fetchTransactions,
    };
 }
