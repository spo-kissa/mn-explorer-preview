"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import JsonViewer from "@/components/elements/JsonViewer";
import CopyToClipboard from "@/components/elements/CopyToClipboard";
import useGetBlock, { Block, UseGetBlockOptions, UseGetBlockResult } from "@/app/hooks/useGetBlock";
import useGetTransactionsByBlockHash, { UseGetTransactionsByBlockHashResult } from "@/app/hooks/useGetTransactionsByBlockHash";
import { Transaction } from "@/lib/db/GetTransactionsByBlockHash";

export default function BlockDetail({ hash }: { hash: string }) {
    
    const { block, isLoading, error, refetch } = useGetBlock({ hash: hash || undefined, enabled: !!hash });
    const { transactions, isLoading: isTransactionsLoading, error: transactionsError, refetch: refetchTransactions } = useGetTransactionsByBlockHash(hash);
    const [isLedgerParamsExpanded, setIsLedgerParamsExpanded] = useState(false);
    const [isRawDataExpanded, setIsRawDataExpanded] = useState(false);

    const prepareValue = (value: any): any => {
        if (value === null || value === undefined) {
            return value;
        }
        if (typeof value === "object" && value.header) {
            // header.digestとheader.headerをパースする
            const prepared = { ...value };
            if (prepared.header) {
                if (typeof prepared.header.digest === "string") {
                    try {
                        prepared.header.digest = JSON.parse(prepared.header.digest);
                    } catch (e) {
                        // パースに失敗した場合はそのまま
                    }
                }
                if (typeof prepared.header.header === "string") {
                    try {
                        prepared.header.header = JSON.parse(prepared.header.header);
                    } catch (e) {
                        // パースに失敗した場合はそのまま
                    }
                }
            }
            return prepared;
        }
        return value;
    };

    const formatValue = (value: any): React.ReactNode => {
        if (value === null || value === undefined) {
            return "N/A";
        }
        if (typeof value === "object") {
            const prepared = prepareValue(value);
            return <JsonViewer data={prepared} level={3} defaultExpanded={true} />;
        }
        return String(value);
    };

    const renderField = (label: string, value: any) => {
        const formatted = formatValue(value);
        if (typeof value === "object" && value !== null) {
            return (
                <div className="mb-4">
                    <strong className="block mb-2">{label}:</strong>
                    <div className="whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-800 p-4 rounded mt-1 text-sm overflow-x-auto font-mono">
                        {formatted}
                    </div>
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
        if (isLoading || isTransactionsLoading) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
        if (transactionsError) {
            return <div>Error: {transactionsError}</div>;
        }
        if (!block) {
            return <div>Block not found</div>;
        }
        let txs = transactions;
        if (!txs) {
            txs = [];
        }
        
        // blockがオブジェクトの場合、すべてのフィールドを動的に表示
        const blockAny = block as any;
        
        return (
            <div className="max-w-7xlspace-y-4">
                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">Summary</h2>

                    <div className="flex flex-row gap-2 mb-2 w-full">
                        <div className="basis-1/3">
                            <label className="text-lg font-bold block text-center">Block Height</label>
                            <p className="text-center">#{block.height.toLocaleString()}</p>
                        </div>
                        <div className="basis-1/3">
                            <label className="text-lg font-bold block text-center">Timestamp</label>
                            <p className="text-center">{new Date(block.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="basis-1/3">
                            <label className="text-lg font-bold block text-center">Transactions</label>
                            <p className="text-center">{block.tx_count} txs</p>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">Block Information</h2>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Block Hash</label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            {block.hash}
                            <CopyToClipboard text={block.hash} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Parent Hash</label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            {block.parent_hash}
                            <CopyToClipboard text={block.parent_hash} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Author</label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            0x{block.author}
                            <CopyToClipboard text={"0x" + block.author} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">State Root</label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            0x{block.state_root}
                            <CopyToClipboard text={"0x" + block.state_root} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Timestamp</label>
                        <p className="basis-2/3 text-right">{new Date(block.timestamp).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Protocol Version</label>
                        <p className="basis-2/3 text-right">v{block.protocol_version}</p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Finalized</label>
                        <p className={`basis-2/3 text-right ${block.is_finalized ? "text-green-500" : "text-red-500"}`}>{block.is_finalized ? "TRUE" : "FALSE"}</p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">Transaction Count</label>
                        <p className="basis-2/3 text-right">{block.tx_count}</p>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        Transactions
                        (<span className="font-mono">{txs.length.toString()}</span>)
                    </h2>

                    <div className="flex flex-row justify-center gap-2 mb-4 w-full px-4 text-center">

                        {txs.length === 0 && (
                            <p>No transactions found this block.</p>
                        )}

                        {txs.length > 0 && (
                            <ol className="w-full">
                                <li className="p-2 border border-gray-200 dark:border-gray-700 rounded-t-lg">
                                    <dl className="grid grid-cols-6 gap-1">
                                        <dt className="col-span-1 font-bold">Index</dt>
                                        <dd className="col-span-4 font-bold">Hash</dd>
                                        <dd className="col-span-1 font-bold">Status</dd>
                                    </dl>
                                </li>
                                {txs.map((tx) => (
                                    <Link href={`/transaction/${tx.hash}`} key={tx.index_in_block.toString()}>
                                        <li className="p-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                            <dl className="grid grid-cols-6 gap-1 items-center">
                                                <dt className="col-span-1 font-mono text-sm align-middle">
                                                    <span className={`h-[32px] w-[32px] inline-flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-md ${tx.status === "SUCCESS" ? "bg-green-500" : "bg-red-500"} text-white`}>
                                                        {(tx.index_in_block + 1).toString()}
                                                    </span>
                                                </dt>
                                                <dd className="col-span-4 font-mono text-sm">
                                                    0x{tx.hash}
                                                    <span className="ml-2"><CopyToClipboard text={"0x" + tx.hash} /></span>
                                                </dd>
                                                <dd className={`col-span-1 font-mono text-sm ${tx.status === "SUCCESS" ? "text-green-500" : "text-red-500"}`}>
                                                    {tx.status}
                                                </dd>
                                            </dl>
                                        </li>
                                    </Link>
                                ))}
                            </ol>
                        )}
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">

                    <div className="flex flex-row gap-2 mt-4 mb-4 w-full px-4">
                        <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                            <button
                                onClick={() => setIsLedgerParamsExpanded(!isLedgerParamsExpanded)}
                                className="w-full text-lg font-bold block mb-1 bg-gray-100 dark:bg-gray-800 py-2 px-4 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer rounded-t-lg"
                            >
                                <span>Ledger Parameters ({block.ledger_parameters ? block.ledger_parameters.length.toLocaleString() : "0"} bytes)</span>
                                <span className="text-sm">{isLedgerParamsExpanded ? "▼" : "▶"}</span>
                            </button>
                            {isLedgerParamsExpanded && (
                                <p className="break-all text-xs font-mono p-4">{block.ledger_parameters}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                            <button
                                onClick={() => setIsRawDataExpanded(!isRawDataExpanded)}
                                className="w-full text-lg font-bold block mb-1 bg-gray-100 dark:bg-gray-800 py-2 px-4 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer rounded-t-lg"
                            >
                                <span>Raw Data</span>
                                <span className="text-sm">{isRawDataExpanded ? "▼" : "▶"}</span>
                            </button>
                            {isRawDataExpanded && (
                                <div className="break-all text-xs font-mono p-4 overflow-x-auto">
                                    {formatValue(block.raw)}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>{content()}</Suspense>
        </div>
    );
}
