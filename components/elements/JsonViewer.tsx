"use client";

import { useState } from "react";

interface JsonViewerProps {
    data: any;
    level?: number;
    defaultExpanded?: boolean;
}

export default function JsonViewer({ data, level = 0, defaultExpanded = false }: JsonViewerProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded || level < 2);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const indent = level * 20;

    if (data === null) {
        return <span className="text-gray-500">null</span>;
    }

    if (data === undefined) {
        return <span className="text-gray-500">undefined</span>;
    }

    if (typeof data === "string") {
        return <span className="text-green-600 dark:text-green-400">"{data}"</span>;
    }

    if (typeof data === "number") {
        return <span className="text-blue-600 dark:text-blue-400">{data}</span>;
    }

    if (typeof data === "boolean") {
        return <span className="text-purple-600 dark:text-purple-400">{String(data)}</span>;
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return <span className="text-gray-500">[]</span>;
        }

        return (
            <span className="inline-block">
                <button
                    onClick={toggleExpanded}
                    className="inline-flex items-center gap-1 text-left hover:opacity-70 transition-opacity"
                    type="button"
                >
                    <span className="text-gray-400 select-none">
                        {isExpanded ? "▼" : "▶"}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                        [{data.length}]
                    </span>
                </button>
                {isExpanded && (
                    <div className="ml-4 mt-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                        {data.map((item, index) => (
                            <div key={index} className="mb-1 flex items-start">
                                <span className="text-gray-500 mr-2 flex-shrink-0">{index}:</span>
                                <span className="flex-1">
                                    <JsonViewer data={item} level={level + 1} defaultExpanded={defaultExpanded} />
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </span>
        );
    }

    if (typeof data === "object") {
        const keys = Object.keys(data);
        if (keys.length === 0) {
            return <span className="text-gray-500">{`{}`}</span>;
        }

        return (
            <span className="inline-block">
                <button
                    onClick={toggleExpanded}
                    className="inline-flex items-center gap-1 text-left hover:opacity-70 transition-opacity"
                    type="button"
                >
                    <span className="text-gray-400 select-none">
                        {isExpanded ? "▼" : "▶"}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                        {`{${keys.length}}`}
                    </span>
                </button>
                {isExpanded && (
                    <div className="ml-4 mt-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                        {keys.map((key) => (
                            <div key={key} className="mb-1 flex items-start">
                                <span className="text-orange-600 dark:text-orange-400 font-semibold mr-2 flex-shrink-0">
                                    "{key}":
                                </span>
                                <span className="flex-1">
                                    <JsonViewer data={data[key]} level={level + 1} defaultExpanded={defaultExpanded} />
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </span>
        );
    }

    return <span>{String(data)}</span>;
}
