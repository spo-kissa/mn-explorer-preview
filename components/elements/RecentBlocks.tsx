"use client";

import RecentBlock from "./RecentBlock";
import { RecentBlock as RecentBlockType } from "@/app/hooks/useStatsWebSocket";
import { useI18n } from "@/i18n";

export default function RecentBlocks({ blocks }: { blocks: RecentBlockType[] }) {
    const { t } = useI18n();

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {t("recentBlocks.title")}
            </h2>
            <div className="w-full flex flex-row gap-2 items-center">
                <ul className="w-full flex flex-col gap-2 items-center">
                    {blocks.map((block, index) => (
                        <RecentBlock key={index} block={block} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
