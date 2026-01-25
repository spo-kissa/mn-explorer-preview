"use client";

import useGetBlock, { Block, UseGetBlockOptions, UseGetBlockResult } from "@/app/hooks/useGetBlock";
import { Suspense } from "react";

export default function BlockDetail({
    hash 
}: { 
    hash: string 
}) {
    const { block, isLoading, error, refetch } = useGetBlock({ hash: hash || undefined, enabled: !!hash });

    const formatValue = (value: any): string => {
        if (value === null || value === undefined) {
            return "N/A";
        }
        if (typeof value === "object") {
            let digest = value.header.digest;
            if (typeof digest === "string") {
                digest = JSON.parse(digest);
            }
            value.header.digest = digest;
            let header = value.header.header;
            if (typeof header === "string") {
                header = JSON.parse(header);
            }
            value.header.header = header;
            const formatted = JSON.stringify(value, true, 2);
            return (
                <pre>
                    {formatted}
                </pre>
            );
        }
        return String(value);
    };

    const renderField = (label: string, value: any) => {
        const formatted = formatValue(value);
        if (typeof value === "object" && value !== null) {
            return (
                <div className="mb-4">
                    <strong>{label}:</strong>
                    <pre className="whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1 text-sm overflow-x-auto">
                        {formatted}
                    </pre>
                </div>
            );
        }
        else if (label === "Ledger Parameters") {
            return (
                <div className="mb-4 max-w-7xl text-wrap">
                    <strong>{label}:</strong>
                    <p className="p-4 break-all text-xs font-mono">
                        {formatted}
                    </p>
                </div>
            )
        }
        return (
            <p className="mb-2">
                <strong>{label}:</strong> {formatted}
            </p>
        );
    };

    const content = () => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
        if (!block) {
            return <div>Block not found</div>;
        }
        
        // blockがオブジェクトの場合、すべてのフィールドを動的に表示
        const blockAny = block as any;
        
        return (
            <div className="max-w-7xlspace-y-4">
                <div className="">
                    <h2 className="text-xl font-bold mb-2">Summary</h2>
                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-1/3">
                            <label className="text-lg font-bold">Block Height</label>
                            <p>#{block.height}</p>
                        </div>
                        <div className="basis-1/3">
                            <label className="text-lg font-bold">Timestamp</label>
                            <p>{new Date(block.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="basis-1/3">
                            <label className="text-lg font-bold">Transactions</label>
                            <p>{block.tx_count} txs</p>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h2 className="text-xl font-bold mb-2">Block Information</h2>
                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Block Hash</label>
                            <p className="font-mono">{block.hash}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Parent Hash</label>
                            <p className="font-mono">{block.parent_hash}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Author</label>
                            <p className="font-mono">0x{block.author}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">State Root</label>
                            <p className="font-mono">0x{block.state_root}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Timestamp</label>
                            <p>{new Date(block.timestamp).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Protocol Version</label>
                            <p>v{block.protocol_version}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Finalized</label>
                            <p>{block.is_finalized ? "True" : "False"}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis-2/3">
                            <label className="text-lg font-bold">Transaction Count</label>
                            <p>{block.tx_count}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis">
                            <label className="text-lg font-bold">Ledger Parameters</label>
                            <p className="break-all text-xs font-mono">{block.ledger_parameters}</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full">
                        <div className="basis">
                            <label className="text-lg font-bold">Raw</label>
                            <p className="break-all text-xs font-mono">
                                {formatValue(block.raw)}
                            </p>
                        </div>
                    </div>

                </div>

                {blockAny.blockNumber !== undefined && renderField("Block Number", blockAny.blockNumber)}
                {blockAny.slot !== undefined && renderField("Slot", blockAny.slot)}
                {blockAny.extrinsicsCount !== undefined && renderField("Extrinsics Count", blockAny.extrinsicsCount)}
                {blockAny.eventsCount !== undefined && renderField("Events Count", blockAny.eventsCount)}
                {blockAny.isEmpty !== undefined && renderField("Is Empty", blockAny.isEmpty ? "Yes" : "No")}
                {blockAny.encodedLength !== undefined && renderField("Encoded Length", blockAny.encodedLength)}
                {blockAny.header !== undefined && renderField("Header", blockAny.header)}
                {blockAny.events !== undefined && renderField("Events", blockAny.events)}
                {blockAny.justifications !== undefined && renderField("Justifications", blockAny.justifications)}
            </div>
        );
    }

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>{content()}</Suspense>
        </div>
    );
}
