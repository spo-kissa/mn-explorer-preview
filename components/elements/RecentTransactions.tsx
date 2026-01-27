"use client";

import RecentTransaction from "./RecentTransaction";
import { RecentTransaction as RecentTransactionType } from "@/app/hooks/useStatsWebSocket";
import { useI18n } from "@/i18n";

export default function RecentTransactions({ txs }: { txs: RecentTransactionType[] }) {
    const { t } = useI18n();

    return (
        <div className="w-full flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                {t("recentTransactions.title")}
            </h2>
            <ul className="w-full flex flex-col gap-2 items-center">
                {txs.map((tx, index) => (
                    <RecentTransaction key={index} tx={tx} />
                ))}
            </ul>
        </div>
    );
}
