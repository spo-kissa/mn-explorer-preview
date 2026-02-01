"use client";

import Link from "next/link";
import type { RecentBlock } from "@/types/stats";
import { useI18n } from "@/i18n";
import DateTime from "@/components/elements/DateTime";
import Hash from "./client/Hash";

export default function RecentBlock({ block }: { block: RecentBlock }) {

    const { t } = useI18n();

    return (
        <Link href={`/block/${block.hash}`} className="hover:opacity-80 flex flex-row gap-2 items-center justify-between border border-gray-700 rounded-md px-2 py-2 w-full hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors transition-opacity">
            <li className="flex flex-row gap-1 items-center justify-between w-full">
                <dl className="flex flex-row gap-2 items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <dt className="text-mono text-[11px] font-medium text-gray-500 dark:text-gray-300 w-fit border border-gray-500 rounded-md px-1 py-0.5">
                            #{block.height.toLocaleString()}
                        </dt>
                        <dd className="font-mono text-xs">
                            <Hash hash={block.hash} />
                        </dd>
                    </div>
                    <div className="flex flex-col gap-2 items-end justify-end">
                        <dd className="text-mono text-xs">
                            <DateTime timestamp={block.timestamp} />
                        </dd>
                        <dd className="text-mono text-xs">
                            {t("recentBlocks.txs").replace("{{count}}", block.txsCount.toString())}
                        </dd>
                    </div>
                </dl>
            </li>
        </Link>
    );
}
