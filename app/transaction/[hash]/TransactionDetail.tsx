"use client";

import { Suspense } from "react";
import { formatLovelace } from "@/lib/lovelace";
import Link from "next/link";
import useGetTransactionByHash from "@/app/hooks/useGetTransactionByHash";
import useDustLedgerEventsByTxId from "@/app/hooks/useDustLedgerEventsByTxId";
import CopyToClipboard from "@/components/elements/CopyToClipboard";
import TransactionIO from "@/components/elements/TransactionIO";
import { useI18n } from "@/i18n";
import type { TxId } from "@/types/transaction";

export default function TransactionDetail({ hash }: { hash: string }) {

    const { t } = useI18n();
    const { transaction, isLoading, error } = useGetTransactionByHash(hash);
    const txId: TxId | null = transaction?.transaction_id ?? null;
    const {
        dustLedgerEvents,
        isLoading: dustLedgerEventsLoading,
        error: dustLedgerEventsError,
    } = useDustLedgerEventsByTxId(txId);

    const content = () => {
        if (isLoading) {
            return <div>{t("common.loading")}</div>;
        }
        if (error) {
            return (
                <div>
                    {t("common.error")}: {error}
                </div>
            );
        }
        if (!transaction) {
            return <div>{t("transactionDetail.notFound")}</div>;
        }

        const tx = transaction;

        return (
            <>
                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">
                    
                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        {t("transactionDetail.summary")}
                    </h2>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.transactionHash")}
                        </label>
                        <p className="basis-2/3 font-mono text-right">
                            <span className="mr-1">{tx.hash}</span>
                            <CopyToClipboard text={tx.hash} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.blockHash")}
                        </label>
                        <p className="basis-2/3 font-mono text-right">
                            <span className="mr-1">
                                <Link href={`/block/${tx.block_hash}`} className="hover:opacity-80 transition-opacity">
                                    {tx.block_hash}
                                </Link>
                            </span>
                            <CopyToClipboard text={tx.block_hash} />
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.blockHeight")}
                        </label>
                        <p className="basis-2/3 text-right">
                            #{tx.block_height.toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.indexInBlock")}
                        </label>
                        <p className="basis-2/3 text-right">
                            {(tx.index_in_block + 1)}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.timestamp")}
                        </label>
                        <p className="basis-2/3 text-right">
                            {new Date(tx.timestamp).toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.status")}
                        </label>
                        <p className={`basis-2/3 text-right ${tx.status === "SUCCESS" ? "text-green-500" : "text-red-500"}`}>
                            {tx.status}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.shielded")}
                        </label>
                        <p
                            className={`basis-2/3 text-right ${
                                tx.is_shielded ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {tx.is_shielded
                                ? t("transactionDetail.trueLabel")
                                : t("transactionDetail.falseLabel")}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.transactionId")}
                        </label>
                        <p className="basis-2/3 text-right">
                            #{tx.transaction_id.toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.protocolVersion")}
                        </label>
                        <p className="basis-2/3 text-right">
                            v{tx.protocol_version}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.totalInput")}
                        </label>
                        <p className="basis-2/3 text-right">
                            {formatLovelace(tx.unshielded_total_input)}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.totalOutput")}
                        </label>
                        <p className="basis-2/3 text-right">
                            {formatLovelace(tx.unshielded_total_output)}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.startIndex")}
                        </label>
                        <p className="basis-2/3 text-right">
                            {tx.start_index?.toLocaleString()}
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 mb-2 w-full px-4">
                        <label className="basis-1/3 text-lg font-bold">
                            {t("transactionDetail.endIndex")}
                        </label>
                        <p className="basis-2/3 text-right">
                            {tx.end_index?.toLocaleString()}
                        </p>
                    </div>
                </div>

                {(tx.transaction_outputs.length > 0 || tx.transaction_inputs.length > 0) && (
                    <div className="grid grid-cols-2 gap-2 border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                        <div className="gap-2">

                            <h3 className="text-lg font-bold p-2 mb-4">
                                {t("transactionDetail.inputs")}
                                <span className="ml-1 font-mono">
                                    ({tx.transaction_outputs.length})
                                </span>
                            </h3>

                            <div className="flex flex-col gap-4 mb-4 w-full px-4">
                                {tx.transaction_outputs.map(io => (
                                    <TransactionIO key={io.index} io={io} />
                                ))}
                            </div>
                        
                        </div>

                        <div className="gap-2">

                            <h3 className="text-lg font-bold p-2 mb-4">
                                {t("transactionDetail.outputs")}
                                <span className="ml-1 font-mono">
                                    ({tx.transaction_inputs.length})
                                </span>
                            </h3>

                            <div className="flex flex-col gap-4 mb-4 w-full px-4">
                                {tx.transaction_inputs.map(io => (
                                    <TransactionIO key={io.index} io={io} />
                                ))}
                            </div>

                        </div>

                    </div>
                )}

                {tx.identifiers.length > 0 && (
                    <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                        <h2 className="text-2xl font-bold mb-4 ml-2">
                            {t("transactionDetail.identifiers")}
                        </h2>

                        <div className="flex flex-col gap-4 mb-4 w-full px-4">

                            {tx.identifiers.map((id, index) => (
                                
                                <div key={index} className="flex flex-row items-center gap-2 w-full px-4">
                                    <p className="font-mono text-sm">
                                        <span className="h-[32px] w-[32px] inline-flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-md text-white">
                                            {id.index_in_tx}
                                        </span>
                                    </p>
                                    <p className="justify-center font-mono text-sm">
                                        <span className="mr-1">{id.identifier}</span>
                                        <CopyToClipboard text={id.identifier} />
                                    </p>
                                </div>
                                
                            ))}
                        </div>

                    </div>
                )}

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        {t("transactionDetail.dustLedgerEvents")}
                    </h2>

                    {dustLedgerEventsLoading && (
                        <div className="px-4 text-gray-500 dark:text-gray-400">
                            {t("transactionDetail.dustLedgerEventsLoading")}
                        </div>
                    )}
                    {dustLedgerEventsError && (
                        <div className="px-4 text-red-500">
                            {dustLedgerEventsError}
                        </div>
                    )}
                    {!dustLedgerEventsLoading && !dustLedgerEventsError && (!dustLedgerEvents || dustLedgerEvents.length === 0) && (
                        <div className="px-4 text-gray-500 dark:text-gray-400">
                            {t("transactionDetail.dustLedgerEventsEmpty")}
                        </div>
                    )}
                    {!dustLedgerEventsLoading && !dustLedgerEventsError && dustLedgerEvents && dustLedgerEvents.length > 0 && (
                        <div className="flex flex-col gap-4 mb-4 w-full px-4">
                            {dustLedgerEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md"
                                >
                                    <div className="flex flex-row gap-2">
                                        <span className="font-bold basis-1/4">index</span>
                                        <span className="font-mono text-sm basis-3/4">{(event.index_in_tx + 1).toLocaleString()}</span>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <span className="font-bold basis-1/4">event_id</span>
                                        <span className="font-mono text-sm basis-3/4">{event.event_id}</span>
                                    </div>
                                    {event.event_name != null && (
                                        <div className="flex flex-row gap-2">
                                            <span className="font-bold basis-1/4">event_name</span>
                                            <span className="font-mono text-sm basis-3/4">{event.event_name}</span>
                                        </div>
                                    )}
                                    <div className="flex flex-row gap-2">
                                        <span className="font-bold basis-1/4">event_raw</span>
                                        <p className="break-all font-mono text-xs basis-3/4">{event.event_raw}</p>
                                    </div>
                                    {event.output_nonce != null && (
                                        <div className="flex flex-row gap-2">
                                            <span className="font-bold basis-1/4">output_nonce</span>
                                            <span className="font-mono text-sm basis-3/4 break-all">{event.output_nonce}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        {t("transactionDetail.rawData")}
                    </h2>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <p className="break-all font-mono text-xs">
                            {tx.raw}
                        </p>
                    </div>

                </div>

                <div className="border border-gray-200 dark:border-gray-700 mb-6 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold mb-4 ml-2">
                        {t("transactionDetail.blockLedgerParameters")}
                    </h2>

                    <div className="flex flex-row gap-2 mb-4 w-full px-4">
                        <p className="break-all font-mono text-xs">
                            {tx.block_ledger_parameters}
                        </p>
                    </div>

                </div>
            </>
        );
    };

    return (
        <div>
            <Suspense fallback={<div>{t("common.loading")}</div>}>{content()}</Suspense>
        </div>
    );
}
