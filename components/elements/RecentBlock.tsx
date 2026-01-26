"use client";

import Link from "next/link";
import { RecentBlock } from "@/app/hooks/useStatsWebSocket";
import CopyToClipboard from "./CopyToClipboard";

export default function RecentBlock({ block }: { block: RecentBlock }) {

    const diffMs = (new Date()).getTime() - block.timestamp;
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    const diffMin = Math.max(0, Math.floor(diffSec / 60));
    // const diffHour = diffMin / 60;
    // const diffDay = diffHour / 24;
    // const diffWeek = diffDay / 7;
    // const diffMonth = diffWeek / 4;
    // const diffYear = diffMonth / 12;

    const hash = block.hash.slice(0, 14) + "..." + block.hash.slice(-10);

    return (
        <Link href={`/block/${block.hash}`} className="hover:opacity-80 flex flex-row gap-2 items-center justify-between border border-gray-700 rounded-md px-2 py-2 w-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors transition-opacity">
            <li className="flex flex-row gap-1 items-center justify-between w-full">
                <dl className="flex flex-row gap-2 items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <dt className="text-mono text-[11px] font-medium text-gray-500 w-fit border border-gray-500 rounded-md px-1 py-0.5">#{block.height.toLocaleString()}</dt>
                        <dd className="font-mono text-xs">
                            <span className="mr-1">{hash}</span>
                            <span>
                                <CopyToClipboard text={block.hash} />
                            </span>
                        </dd>
                    </div>
                    <div className="flex flex-col gap-2 items-end justify-end">
                        <dd className="text-mono text-xs">{diffSec.toFixed(0)} seconds ago</dd>
                        <dd className="text-mono text-xs">{block.txsCount} txs</dd>
                    </div>
                </dl>
            </li>
        </Link>
    );
}
