"use client";

import { RecentTransaction } from "@/app/hooks/useStatsWebSocket";
import Link from "next/link";
import CopyToClipboard from "./CopyToClipboard";

export default function RecentTransaction({ tx }: { tx: RecentTransaction }) {

    const diffMs = (new Date()).getTime() - tx.timestamp;
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    const diffMin = Math.max(0, Math.floor(diffSec / 60));
    const diffHour = diffMin / 60;
    const diffDay = diffHour / 24;
    const diffWeek = diffDay / 7;
    const diffMonth = diffWeek / 4;
    const diffYear = diffMonth / 12;

    const timestamp = 
        diffSec < 60 ? diffSec.toFixed(0) + " seconds ago" :
        diffMin < 60 ? diffMin.toFixed(0) + " minutes " + (diffSec % 60).toFixed(0) + " seconds ago"
        : new Date(tx.timestamp).toLocaleString();
    
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
                        <dd className="text-mono text-xs">{timestamp}</dd>
                        <dd className={`text-mono text-xs ${statusColor}`}>{tx.status}</dd>
                    </div>
                </dl>
            </li>
        </Link>
    );
}
