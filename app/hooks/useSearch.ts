"use client";

import { useState, useCallback, useRef } from "react";
import { Block } from "@/lib/db/GetBlockByHash";
import { Transaction } from "@/types/transaction";
import { AddressForSearch } from "@/types/address";

export interface SearchResult {
    blocks: Block[];
    transactions: Transaction[];
    addresses: AddressForSearch[];
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

            const text = await response.text();

            // リクエストがキャンセルされた場合は何もしない
            if (abortController.signal.aborted) {
                return;
            }

            let data: unknown;
            try {
                data = JSON.parse(text);
            } catch {
                // サーバーが HTML エラーページなどを返した場合
                setError("ERROR_OCCURRED");
                setResult(null);
                return;
            }
            console.log("Response data:", data);

            if (!response.ok) {
                setError("ERROR_OCCURRED");
                setResult(null);
                return;
            }

            if (
                typeof data === "object" &&
                data !== null &&
                "error" in data &&
                (data as { error: unknown }).error
            ) {
                setError(
                    typeof (data as { error: unknown }).error === "string"
                        ? (data as { error: string }).error
                        : "ERROR_OCCURRED",
                );
                setResult(null);
                return;
            }

            setResult(data as Parameters<typeof setResult>[0]);
        } catch (err) {
            // AbortErrorは無視（ユーザーが新しい検索を開始した場合）
            if (err instanceof Error && err.name === "AbortError") {
                return;
            }
            console.error("Search error:", err);
            // ネットワークエラーやパースエラーなどはユーザー向けメッセージに統一
            setError("ERROR_OCCURRED");
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
