"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import useSearch from "@/app/hooks/useSearch";
import { useI18n } from "@/i18n";

export default function SearchElement() {
    const { t } = useI18n();
    const { search, result, isLoading, error, clearResult } = useSearch();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                clearResult();
            }
        };

        if (result) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [result, clearResult]);

    const handleSearch = async (type: string, query: string) => {
        console.log("handleSearch called:", { type, query });
        if (!query || query.trim().length === 0) {
            console.log("Query is empty, returning");
            return;
        }
        console.log("Calling search function");
        await search(query);
    };

    return (
        <div className="relative w-full mb-10">
            <div className="flex flex-row gap-2 items-center">
                <SearchBox onSearch={handleSearch} />
            </div>
            
            {/* 検索結果フローティング */}
            {(isLoading || result || error) && (
                <div 
                    ref={dropdownRef}
                    className="absolute top-full left-0 mt-2 min-w-full w-[120%] bg-white border border-gray-300 rounded-md shadow-xl z-50 dark:bg-zinc-900 dark:border-zinc-700"
                >
                    {isLoading && (
                        <div className="p-2 text-center text-sm text-gray-500 dark:text-gray-400">
                            {t("search.searching")}
                        </div>
                    )}

                    {error && !isLoading && (
                        <div className="p-2 text-center text-sm text-red-500 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {result && !isLoading && result.error && (
                        <div className="p-2 text-center text-sm text-red-500 dark:text-red-400">
                            {result.error || t("search.invalidQuery")}
                        </div>
                    )}

                    {result && !isLoading && result.blocks.length > 0 && result.blocks.map((block) => (
                        
                        <div key={block.hash} className="p-2">
                            <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {t("search.blockFound")}
                            </div>
                            <Link 
                                href={`/block/${block.hash}`}
                                className="block p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                onClick={clearResult}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("search.height")}: #{block.height.toLocaleString()}
                                    </div>
                                    <div className="text-xs font-mono text-gray-900 dark:text-gray-100">
                                        Hash: {block.hash}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("search.transactions")}: {block.tx_count}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {result && !isLoading && result.transactions.length > 0 && result.transactions.map((tx) => (

                        <div key={tx.hash} className="p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {t("search.transactionFound")}
                            </div>
                            <Link 
                                href={`/transaction/${tx.hash}`}
                                className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                onClick={clearResult}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs font-mono text-gray-900 dark:text-gray-100">
                                        Hash: {tx.hash}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("search.block")}: #{tx.block_height.toLocaleString()}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
