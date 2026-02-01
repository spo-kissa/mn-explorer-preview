"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import JsonViewer from "@/components/elements/JsonViewer";
import CopyToClipboard from "@/components/elements/CopyToClipboard";
import useGetBlock from "@/app/hooks/useGetBlock";
import useGetTransactionsByBlockHash from "@/app/hooks/useGetTransactionsByBlockHash";
import { useI18n } from "@/i18n";

export default function BlockDetail({ hash }: { hash: string }) {
    
    const { t } = useI18n();
    const { block, isLoading, error } = useGetBlock({ hash: hash || undefined, enabled: hash !== undefined});
    const { transactions, isLoading: isTransactionsLoading, error: transactionsError } = useGetTransactionsByBlockHash(hash);
    const [isLedgerParamsExpanded, setIsLedgerParamsExpanded] = useState(false);
    const [isRawDataExpanded, setIsRawDataExpanded] = useState(false);

    const prepareValue = (value: object | string): object => {
        if (value === null || value === undefined) {
            return {} as object;
        }
        if (typeof value === "object" && value !== null && "header" in value) {
            // header.digestとheader.headerをパースする
            const prepared = value as { header: { digest: string; header: string } };
            if (prepared.header) {
                if (typeof prepared.header.digest === "string") {
                    try {
                        prepared.header.digest = JSON.parse(prepared.header.digest);
                    } catch {
                        // パースに失敗した場合はそのまま
                    }
                }
                if (typeof prepared.header.header === "string") {
                    try {
                        prepared.header.header = JSON.parse(prepared.header.header);
                    } catch {
                        // パースに失敗した場合はそのまま
                    }
                }
            }
            return prepared;
        }
        if (typeof value === "string") {
            return JSON.parse(value) as object;
        }
        else {
            return value as object;
        }
    };

    const formatValue = (value: object | string): React.ReactNode => {
        if (value === null || value === undefined) {
            return t("stats.notAvailable");
        }
        if (typeof value === "object" && value !== null) {
            const prepared = prepareValue(value);
            return <JsonViewer data={prepared} level={3} defaultExpanded={true} />;
        }
        return String(value);
    };

    const content = () => {
        if (isLoading || isTransactionsLoading) {
            return <div>{t("common.loading")}</div>;
        }
        if (error) {
            return (
                <div>
                    {t("common.error")}: {error}
                </div>
            );
        }
        if (transactionsError) {
            return (
                <div>
                    {t("common.error")}: {transactionsError}
                </div>
            );
        }
        if (!block) {
            return <div>{t("common.blockDetails")}: {t("blockDetail.noTransactions")}</div>;
        }
        let txs = transactions;
        if (!txs) {
            txs = [];
        }
        
        return (
            <div className="max-w-7xlspace-y-4">
                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">{t("blockDetail.summary")}</h2>

                    <div className="flex flex-row gap-2 mb-2 w-full">
                        <div className="basis-1/3">
                            <label className="text-lg font-bold block text-center">
                                {t("blockDetail.blockHeight")}
                            </label>
                            <p className="text-center">#{block.height.toLocaleString()}</p>
                        </div>
                        <div className="basis-1/3">
                            <label className="text-lg font-bold block text-center">
                                {t("blockDetail.timestamp")}
                            </label>
                            <p className="text-center">{new Date(block.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="basis-1/3">
                            <label className="text-lg font-bold block text-center">
                                {t("blockDetail.transactions")}
                            </label>
                            <p className="text-center">{block.tx_count} txs</p>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        {t("blockDetail.blockInformation")}
                    </h2>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.blockHash")}
                        </label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            {block.hash}
                            <CopyToClipboard text={block.hash} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.parentHash")}
                        </label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            <Link href={`/block/${block.parent_hash}`} className="hover:opacity-80 transition-opacity">
                                {block.parent_hash}
                            </Link>
                            <CopyToClipboard text={block.parent_hash} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.author")}
                        </label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            {block.author}
                            <CopyToClipboard text={block.author} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.stateRoot")}
                        </label>
                        <p className="basis-2/3 font-mono text-sm text-right">
                            {block.state_root}
                            <CopyToClipboard text={block.state_root} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.timestamp")}
                        </label>
                        <p className="basis-2/3 text-right">{new Date(block.timestamp).toLocaleString()}</p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.protocolVersion")}
                        </label>
                        <p className="basis-2/3 text-right">v{block.protocol_version}</p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.finalized")}
                        </label>
                        <p
                            className={`basis-2/3 text-right ${
                                block.is_finalized ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {block.is_finalized ? t("blockDetail.trueLabel") : t("blockDetail.falseLabel")}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("blockDetail.transactionCount")}
                        </label>
                        <p className="basis-2/3 text-right">{block.tx_count}</p>
                    </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        {t("blockDetail.transactionsTitle")}
                        (<span className="font-mono">{txs.length.toString()}</span>)
                    </h2>

                    <div className="flex flex-row justify-center gap-2 mb-4 w-full px-4 text-center">

                        {txs.length === 0 && (
                            <p>{t("blockDetail.noTransactions")}</p>
                        )}

                        {txs.length > 0 && (
                            <ol className="w-full">
                                <li className="p-2 border border-gray-200 dark:border-gray-700 rounded-t-lg">
                                    <dl className="grid grid-cols-6 gap-1">
                                        <dt className="col-span-1 font-bold">
                                            {t("blockDetail.index")}
                                        </dt>
                                        <dd className="col-span-4  font-bold">
                                            {t("blockDetail.hash")}
                                        </dd>
                                        <dd className="col-span-1 font-bold">
                                            {t("blockDetail.status")}
                                        </dd>
                                    </dl>
                                </li>
                                {txs.map((tx) => (
                                    <Link href={`/transaction/${tx.hash}`} key={tx.index_in_block.toString()}>
                                        <li className="p-2 border border-t-0 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                            <dl className="grid grid-cols-6 gap-1 items-center">
                                                <dt className="col-span-1 font-mono text-sm align-middle">
                                                    <span className={`h-[32px] w-[32px] inline-flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-md ${tx.status === "SUCCESS" ? "bg-green-500" : "bg-red-500"} text-white`}>
                                                        {(tx.index_in_block + 1).toString()}
                                                    </span>
                                                </dt>
                                                <dd className="col-span-4 font-mono text-xs">
                                                    {tx.hash}
                                                    <span className="ml-2"><CopyToClipboard text={tx.hash} /></span>
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
                                <span>
                                    {t("blockDetail.ledgerParameters")} (
                                    {block.ledger_parameters
                                        ? block.ledger_parameters.length.toLocaleString()
                                        : "0"}{" "}
                                    {t("blockDetail.bytesSuffix")})
                                </span>
                                <span className="text-sm">{isLedgerParamsExpanded ? "▼" : "▲"}</span>
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
                                <span>{t("blockDetail.rawData")}</span>
                                <span className="text-sm">{isRawDataExpanded ? "▼" : "▲"}</span>
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
            <Suspense fallback={<div>{t("common.loading")}</div>}>{content()}</Suspense>
        </div>
    );
}
