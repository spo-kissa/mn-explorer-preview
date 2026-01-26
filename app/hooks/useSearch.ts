"use client";

import { useState, useCallback, useRef } from "react";
import { Block } from "@/lib/db/GetBlockByHash";
import { Transaction } from "@/lib/transaction";

export interface SearchResult {
    blocks: Block[];
    transactions: Transaction[];
    error: boolean;
}

export interface UseSearchResult {
    search: (query: string) => Promise<void>;
    result: SearchResult | null;
    isLoading: boolean;
    error: string | null;
    clearResult: () => void;
}

export default function useSearch(): UseSearchResult {
    const [result, setResult] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const search = useCallback(async (query: string) => {
        console.log("useSearch.search called with query:", query);
        if (!query || query.trim().length === 0) {
            setError("Query is required");
            return;
        }

        // 前のリクエストをキャンセル
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // 新しいAbortControllerを作成
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const params = new URLSearchParams();
            params.append("q", query.trim());
            const url = `/api/Search?${params.toString()}`;
            console.log("Fetching from:", url);

            const response = await fetch(url, {
                signal: abortController.signal,
            });
            console.log("Response status:", response.status, response.ok);
            
            const data = await response.json();
            console.log("Response data:", data);

            // リクエストがキャンセルされた場合は何もしない
            if (abortController.signal.aborted) {
                return;
            }

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            if (data.error) {
                setError(data.error || "Failed to search");
                setResult(null);
                return;
            }

            setResult(data);
        } catch (err) {
            // AbortErrorは無視（ユーザーが新しい検索を開始した場合）
            if (err instanceof Error && err.name === "AbortError") {
                return;
            }
            console.error("Search error:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to search";
            setError(errorMessage);
            setResult(null);
        } finally {
            // リクエストがキャンセルされていない場合のみローディング状態を更新
            if (!abortController.signal.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    const clearResult = useCallback(() => {
        // 進行中のリクエストをキャンセル
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setResult(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        search,
        result,
        isLoading,
        error,
        clearResult,
    };
}
