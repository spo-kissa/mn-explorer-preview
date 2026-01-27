'use client';

import { useI18n } from "@/i18n";

export default function DateTime({ timestamp }: { timestamp: number }) {

    const { t } = useI18n();

    const diffMs = (new Date()).getTime() - timestamp;
    const diffSec = Math.max(0, Math.floor(diffMs / 1000));
    const diffMin = Math.max(0, Math.floor(diffSec / 60));
    // const diffHour = Math.max(0, Math.floor(diffMin / 60));
    // const diffDay = Math.max(0, Math.floor(diffHour / 24));
    // const diffWeek = Math.max(0, Math.floor(diffDay / 7));
    // const diffMonth = Math.max(0, Math.floor(diffWeek / 4));
    // const diffYear = Math.max(0, Math.floor(diffMonth / 12));

    const today = (timestamp: number): boolean => {
        const now = new Date();
        const target = new Date(timestamp);
        const y = target.getFullYear();
        const m = target.getMonth();
        const d = target.getDate();
        return y === now.getFullYear() && m === now.getMonth() && d === now.getDate();
    };

    const formatted =
        diffSec < 60
            ? t("recentTransactions.secondsAgo").replace("{{seconds}}", diffSec.toFixed(0))
            : diffMin < 60
            ? t("recentTransactions.minutesSecondsAgo")
                  .replace("{{minutes}}", diffMin.toFixed(0))
                  .replace("{{seconds}}", (diffSec % 60).toFixed(0))
            : today(timestamp)
            ? 'today ' + new Date(timestamp).toLocaleTimeString()
            : new Date(timestamp).toLocaleString();

    return (
        <>
            {formatted}
        </>
    );
}
