"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useI18n } from "@/i18n";

interface SearchBoxProps {
    onSearch?: (type: string, query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
    const { t } = useI18n();
    const searchTypes = useMemo(
        () => [
            { key: "All", label: t("search.typeAll") },
            { key: "Hash", label: t("search.typeHash") },
            { key: "Height", label: t("search.typeHeight") },
            { key: "Address", label: t("search.typeAddress") },
            { key: "Contracts", label: t("search.typeContracts") },
        ],
        [t],
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        console.log("SearchBox handleSearch called", { selectedType, searchQuery, onSearch: !!onSearch });
        if (onSearch) {
            onSearch(selectedType, searchQuery);
        } else {
            console.warn("onSearch callback is not provided");
        }
    };

    return (
        <div className="relative flex-1 flex items-center">
            {/* ドロップダウンメニュー */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-l-md border-[1px] border-r-0 border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-opacity-50 focus:z-10 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                    <span>
                        {searchTypes.find((tItem) => tItem.key === selectedType)?.label ??
                            selectedType}
                    </span>
                    <svg
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <div className="absolute left-0 top-full mt-1 w-32 bg-white border-[1px] border-gray-300 rounded-md shadow-lg z-20 dark:bg-zinc-900 dark:border-zinc-700">
                        {searchTypes.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => {
                                    setSelectedType(type.key);
                                    setIsOpen(false);
                                    // 入力ボックスにフォーカス
                                    setTimeout(() => {
                                        inputRef.current?.focus();
                                    }, 0);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md dark:hover:bg-zinc-800 ${
                                    selectedType === type ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : ""
                                }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 検索入力フィールド */}
            <div className="relative flex-1">
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    ref={inputRef}
                    id="query"
                    name="query"
                    type="text"
                    autoComplete="off"
                    placeholder={t("search.placeholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    className="w-full pl-10 pr-4 py-2 text-sm border-[1px] border-r-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-opacity-50 dark:bg-zinc-900 dark:border-zinc-700"
                />
            </div>

            {/* Search ボタン */}
            <button
                type="button"
                onClick={handleSearch}
                className="group flex items-center justify-center gap-2 px-5 py-2 text-sm rounded-r-md border-[1px] border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-opacity-50 focus:z-10 dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800 whitespace-nowrap cursor-pointer"
            >
                <span className="group-active:translate-y-[1px] transition-transform inline-block">
                    {t("search.button")}
                </span>
            </button>
        </div>
    );
}