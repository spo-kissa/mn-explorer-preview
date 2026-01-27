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
            
            <Stats stats={status?.stats} className="m-4" />

            <div className="w-full flex flex-row gap-4 items-start">
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
