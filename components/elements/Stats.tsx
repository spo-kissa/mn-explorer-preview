"use client";

import { Stats as StatsType } from "@/app/hooks/useStatsWebSocket";
import IconCard from "./IconCard";

export default function Stats({ stats }: { stats: StatsType }) {

    return (
        <div className="w-full flex flex-row gap-2 items-center mb-10">
            <IconCard title="Latest Block" value={(stats?.latestBlockHeight?.toLocaleString() ?? 'N/A')} />
            <IconCard title="Indexed Blocks" value={(stats?.indexedBlocks?.toLocaleString() ?? 'N/A')} />
            <IconCard title="Total Transactions" value={(stats?.totalTransactions?.toLocaleString() ?? 'N/A')} />
            <IconCard title="Total Contracts" value={(stats?.totalContracts?.toLocaleString() ?? 'N/A')} />
        </div>
    );
}
