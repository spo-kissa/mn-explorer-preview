"use client";

import React, { useState } from "react";

const ChevronRight = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-cyan-400 dark:text-cyan-400 flex-shrink-0"
    >
        <path
            d="M4.5 3L7.5 6L4.5 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ChevronDown = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-cyan-400 dark:text-cyan-400 flex-shrink-0"
    >
        <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface JsonViewerProps {
    data: unknown;
    level?: number;
    defaultExpanded?: boolean;
    keyPrefix?: string;
}

function isExpandable(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return false;
}

function ExpandableContainer({
    isExpanded,
    onToggle,
    keyPrefix,
    summary,
    collapsedContent,
    children,
}: {
    isExpanded: boolean;
    onToggle: () => void;
    keyPrefix?: string;
    summary: string;
    collapsedContent: string;
    children: React.ReactNode;
}) {
    const hasKeyPrefix = Boolean(keyPrefix);

    return (
        <span className="inline-flex flex-nowrap items-start">
            <button
                onClick={onToggle}
                className="inline-flex items-center justify-center text-left hover:opacity-70 transition-opacity mr-1 w-4 h-4 flex-shrink-0"
                type="button"
            >
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
            </button>
            {hasKeyPrefix ? (
                isExpanded ? (
                    <div className="ml-0.5 mt-0 pl-1 flex-1 min-w-0 flex flex-col">
                        <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-1.5 flex-shrink-0 min-w-[140px] leading-none">
                            {keyPrefix}
                        </span>
                        {children}
                    </div>
                ) : (
                    <>
                        <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">
                            {keyPrefix}
                        </span>
                        <span className="text-gray-500 ml-1">{collapsedContent}</span>
                    </>
                )
            ) : (
                isExpanded ? (
                    <div className="flex flex-col mt-0">
                        <div className="mt-0.5 pl-0.5">
                            {children}
                        </div>
                    </div>
                ) : (
                    <span className="text-gray-400 dark:text-gray-500 mr-2">
                        {summary}
                    </span>
                )
            )}
        </span>
    );
}

export default function JsonViewer({ data, level = 0, defaultExpanded = false, keyPrefix }: JsonViewerProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded || level < 2);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    if (data === null) {
        return (
            <>
                {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                <span className="text-gray-500">null</span>
            </>
        );
    }

    if (data === undefined) {
        return (
            <>
                {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                <span className="text-gray-500">undefined</span>
            </>
        );
    }

    if (typeof data === "string") {
        return (
            <>
                {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                <span className="text-pink-500 dark:text-pink-400">&quot;{data}&quot;</span>
            </>
        );
    }

    if (typeof data === "number") {
        return (
            <>
                {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                <span className="text-green-500 dark:text-green-400">{data}</span>
            </>
        );
    }

    if (typeof data === "boolean") {
        return (
            <>
                {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                <span className="text-green-500 dark:text-green-400">{String(data)}</span>
            </>
        );
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return (
                <>
                    {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                    <span className="text-gray-500">[]</span>
                </>
            );
        }

        return (
            <ExpandableContainer
                isExpanded={isExpanded}
                onToggle={toggleExpanded}
                keyPrefix={keyPrefix}
                summary={`[${data.length}]`}
                collapsedContent="[...]"
            >
                {data.map((item, index) => {
                    const expandable = isExpandable(item);
                    const containerClass = keyPrefix ? '' : 'ml-0.5 mt-0 pl-1';
                    
                    return (
                        <div key={index} className={containerClass}>
                            <div className="mb-0.5 flex items-start">
                                {expandable ? (
                                    <JsonViewer data={item} level={level + 1} defaultExpanded={defaultExpanded} keyPrefix={`${index}:`} />
                                ) : (
                                    <>
                                        <span className="w-4 flex-shrink-0 mr-1" aria-hidden />
                                        <span className="text-cyan-400 dark:text-cyan-400 mr-2 flex-shrink-0 w-8">{index}:</span>
                                        <span className="flex-1">
                                            <JsonViewer data={item} level={level + 1} defaultExpanded={defaultExpanded} />
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </ExpandableContainer>
        );
    }

    if (typeof data === "object") {
        const keys = Object.keys(data);
        if (keys.length === 0) {
            return (
                <>
                    {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
                    <span className="text-gray-500">{`{}`}</span>
                </>
            );
        }

        const dataRecord = data as Record<string, unknown>;
        return (
            <ExpandableContainer
                isExpanded={isExpanded}
                onToggle={toggleExpanded}
                keyPrefix={keyPrefix}
                summary={`{${keys.length}}`}
                collapsedContent="{...}"
            >
                {keys.map((key) => {
                    const value = dataRecord[key];
                    const expandable = isExpandable(value);
                    const containerClass = keyPrefix ? '' : 'ml-0.5 mt-0 pl-1';
                    
                    return (
                        <div key={key} className={containerClass}>
                            <div className="mb-0.5 flex items-start">
                                {expandable ? (
                                    <JsonViewer data={value} level={level + 1} defaultExpanded={defaultExpanded} keyPrefix={`${key}:`} />
                                ) : (
                                    <>
                                        <span className="w-4 flex-shrink-0 mr-1" aria-hidden />
                                        <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">
                                            {key}:
                                        </span>
                                        <span className="flex-1">
                                            <JsonViewer data={value} level={level + 1} defaultExpanded={defaultExpanded} />
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </ExpandableContainer>
        );
    }

    return (
        <>
            {keyPrefix && <span className="text-cyan-400 dark:text-cyan-400 font-normal mr-2 flex-shrink-0 min-w-[140px]">{keyPrefix}</span>}
            <span>{String(data)}</span>
        </>
    );
}
