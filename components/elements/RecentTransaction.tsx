"use client";

import { RecentTransaction as RecentTransactionType } from "@/app/hooks/useStatsWebSocket";
import Link from "next/link";
import CopyToClipboard from "./CopyToClipboard";
import DateTime from "@/components/elements/DateTime";

export default function RecentTransaction({ tx }: { tx: RecentTransactionType }) {

    const hash = tx.hash.slice(0, 14) + "..." + tx.hash.slice(-10);

    const statusColor = tx.status === "SUCCESS" ? "text-green-500" : "text-red-500";

    return (
        <Link href={`/transaction/${tx.hash}`} className="hover:opacity-80 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors transition-opacity w-full">
            <li className="flex flex-row gap-1 items-center justify-between border border-gray-700 rounded-md px-2 py-2 w-full">
                <dl className="flex flex-row gap-2 items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <dt className="text-mono text-[11px] font-medium text-gray-500 w-fit border border-gray-500 rounded-md px-1 py-0.5">#{tx.block_height.toLocaleString()}</dt>
                        <dd className="font-mono text-xs">
                            <span className="mr-1">{hash}</span>
                            <span>
                                <CopyToClipboard text={tx.hash} />
                            </span>
                        </dd>
                    </div>
                    <div className="flex flex-col gap-2 items-end justify-end">
                        <dd className="text-mono text-xs"><DateTime timestamp={tx.timestamp} /></dd>
                        <dd className={`text-mono text-xs ${statusColor}`}>{tx.status}</dd>
                    </div>
                </dl>
            </li>
        </Link>
    );
}
