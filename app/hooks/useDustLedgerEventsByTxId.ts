'use client';

import { useState, useEffect, useCallback } from "react";
import { DustLedgerEvent, TxId } from "@/types/transaction";

export interface UseDustLedgerEventsByTxIdResult {
    dustLedgerEvents: DustLedgerEvent[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export default function useDustLedgerEventsByTxId(txId: TxId | null | undefined)
: UseDustLedgerEventsByTxIdResult
{
    const [dustLedgerEvents, setDustLedgerEvents] = useState<DustLedgerEvent[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDustLedgerEvents = useCallback(async () => {
        if (txId == null || isNaN(Number(txId))) {
            setError(null);
            setDustLedgerEvents(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append('txId', txId.toString());

            const response = await fetch(`/api/GetDustLedgerEventsByTxId?${params.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDustLedgerEvents(data);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch Dust Ledger Events";
            setError(errorMessage);
            setDustLedgerEvents(null);
        } finally {
            setIsLoading(false);
        }
    }, [txId]);

    useEffect(() => {
        fetchDustLedgerEvents();
    }, [fetchDustLedgerEvents]);

    return {
        dustLedgerEvents,
        isLoading,
        error,
        refetch: fetchDustLedgerEvents,
    }
}
