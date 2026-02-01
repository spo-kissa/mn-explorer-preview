"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import SearchBox from "./SearchBox";
import useSearch from "@/app/hooks/useSearch";
import { useI18n } from "@/i18n";

type SearchElementProps = {
    /** 画面遷移時に呼ぶ（オーバーレイを閉じる用） */
    onClose?: () => void;
};

export default function SearchElement({ onClose }: SearchElementProps = {}) {
    const { t } = useI18n();
    const { search, result, isLoading, error, clearResult } = useSearch();
    const containerRef = useRef<HTMLDivElement>(null); // 検索ボックス + 検索結果全体
    const firstResultRef = useRef<HTMLAnchorElement>(null);

    // 検索結果・ローディング・エラー表示中は、その外側クリックで閉じる
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (containerRef.current && !containerRef.current.contains(target)) {
                clearResult();
            }
        };

        if (isLoading || result || error) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLoading, result, error, clearResult]);

    // 検索結果が表示されたら最初の検索結果にフォーカスを当てる
    useEffect(() => {
        if (result && !result.error && !isLoading) {
            const hasResults =
                (result.addresses?.length ?? 0) > 0 ||
                (result.blocks?.length ?? 0) > 0 ||
                (result.transactions?.length ?? 0) > 0;
            if (hasResults) {
                setTimeout(() => {
                    firstResultRef.current?.focus();
                }, 0);
            }
        }
    }, [result, isLoading]);

    const handleSearch = async (type: string, query: string) => {
        console.log("handleSearch called:", { type, query });
        if (!query || query.trim().length === 0) {
            console.log("Query is empty, returning");
            return;
        }
        console.log("Calling search function");
        await search(query);
    };

    const handleResultClick = () => {
        clearResult();
        onClose?.();
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="flex flex-row gap-2 items-center">
                <SearchBox onSearch={handleSearch} />
            </div>
            
            {/* 検索結果フローティング */}
            {(isLoading || result || error) && (
                <div
                    className="absolute top-full left-0 mt-2 min-w-full w-[120%] bg-white border border-gray-300 rounded-md shadow-xl z-50 dark:bg-zinc-900 dark:border-zinc-700"
                >
                    {isLoading && (
                        <div className="p-2 text-center text-sm text-gray-500 dark:text-gray-400">
                            {t("search.searching")}
                        </div>
                    )}

                    {error && !isLoading && (
                        <div className="p-2 text-center text-sm text-red-500 dark:text-red-400">
                            {error === "ERROR_OCCURRED" ? t("search.errorOccurred") : error}
                        </div>
                    )}

                    {result && !isLoading && result.error && (
                        <div className="p-2 text-center text-sm text-red-500 dark:text-red-400">
                            {result.error || t("search.invalidQuery")}
                        </div>
                    )}

                    {result && !isLoading && result.addresses.length > 0 && result.addresses.map((address, index) => (
                        <div key={address.id} className="p-2">
                            <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {t("search.addressFound")}
                            </div>
                            <Link 
                                ref={index === 0 ? firstResultRef : undefined}
                                href={`/address/${address.unshielded_address_hex}`}
                                className="block p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset transition-colors"
                                onClick={handleResultClick}
                            >
                                <div className="flex flex-col gap-1">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("search.address")}: {address.unshielded_address}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {t("search.addressHex")}: {address.unshielded_address_hex}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {result && !isLoading && result.blocks.length > 0 && result.blocks.map((block, index) => (
                        <div key={block.hash} className="p-2">
                            <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {t("search.blockFound")}
                            </div>
                            <Link 
                                ref={result.addresses.length === 0 && index === 0 ? firstResultRef : undefined}
                                href={`/block/${block.hash}`}
                                className="block p-1 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset transition-colors"
                                onClick={handleResultClick}
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

                    {result && !isLoading && result.transactions.length > 0 && result.transactions.map((tx, index) => (
                        <div key={tx.hash} className="p-4">
                            <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                                {t("search.transactionFound")}
                            </div>
                            <Link 
                                ref={result.addresses.length === 0 && result.blocks.length === 0 && index === 0 ? firstResultRef : undefined}
                                href={`/transaction/${tx.hash}`}
                                className="block p-3 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset transition-colors"
                                onClick={handleResultClick}
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
