"use client";

import { useState, useEffect, useCallback } from "react";
import { Transaction } from "@/types/transaction";

export interface UseGetTransactionByHashResult {
    transaction: Transaction | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}


export default function useGetTransactionByHash(hash: string, enabled: boolean = true)
: UseGetTransactionByHashResult {
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTransaction = useCallback(async () => {
        if (!hash || !enabled) return;

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("hash", hash);

            const response = await fetch(`/api/GetTransaction?${params.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTransaction(data);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch transaction";
            setError(errorMessage);
            setTransaction(null);
        } finally {
            setIsLoading(false);
        }
    }, [hash, enabled]);

    useEffect(() => {
        fetchTransaction();
    }, [fetchTransaction]);

    return {
        transaction,
        isLoading,
        error,
        refetch: fetchTransaction,
    };
}
