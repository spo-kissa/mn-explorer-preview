'use client';

import SearchElement from "@/components/elements/SearchElement";
import Stats from "@/components/elements/Stats";
import useStatsWebSocket from "@/app/hooks/useStatsWebSocket";
import RecentBlocks from "@/components/elements/RecentBlocks";
import RecentExtrinsics from "@/components/elements/RecentExtrinsics";
import RecentTransactions from "@/components/elements/RecentTransactions";

export default function Home() {
    const { stats, isConnected } = useStatsWebSocket();
    
    return (
        <div className="w-full">
            
            <Stats stats={stats?.stats} />
            <div className="w-full flex flex-row gap-4 items-start">
                <div className="w-1/3">
                    <RecentBlocks blocks={stats?.recentBlocks ?? []} />
                </div>
                <div className="w-1/3">
                    <RecentExtrinsics extrinsics={stats?.recentExtrinsics ?? []} />
                </div>
                <div className="w-1/3">
                    <RecentTransactions txs={stats?.recentTransactions ?? []} />
                </div>
            </div>
        </div>
    );
}
