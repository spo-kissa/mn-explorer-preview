'use client';

import SearchElement from "@/components/elements/SearchElement";
import Stats from "@/components/elements/Stats";
import useStatsWebSocket from "@/app/hooks/useStatsWebSocket";
import RecentBlocks from "@/components/elements/RecentBlocks";
import RecentTransactions from "@/components/elements/RecentTransactions";

export default function Home() {
    const { status, isConnected } = useStatsWebSocket();

    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto mb-10 flex flex-row gap-2 items-center">
                <SearchElement />
            </div>
            <Stats stats={status?.stats} />

            <div className="w-full flex flex-row gap-2 items-start">
                <div className="w-1/2">
                    <RecentBlocks blocks={status?.recentBlocks ?? []} />
                </div>
                <div className="w-1/2">
                    <RecentTransactions txs={status?.recentTransactions ?? []} />
                </div>
            </div>
        </div>
    );
}
