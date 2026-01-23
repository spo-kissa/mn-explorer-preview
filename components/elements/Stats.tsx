"use client";

import { useStatsWebSocket } from "@/app/hooks/useStatsWebSocket";
import { useRef, useState, useEffect } from "react";
import IconCard from "./IconCard";

export default function Stats() {

    const { latest, isConnected } = useStatsWebSocket();

    return (
        <div className="w-full flex flex-row gap-2 items-center mb-10">
            <IconCard title="Latest Block" value={(latest?.stats.latestBlockHeight ?? 0).toLocaleString()} />
            <IconCard title="Indexed Blocks" value={(latest?.stats.indexedBlocks ?? 0).toLocaleString()} />
            <IconCard title="Total Transactions" value={(latest?.stats.totalTransactions ?? 0).toLocaleString()} />
            <IconCard title="Total Contracts" value={(latest?.stats.totalContracts ?? 0).toLocaleString()} />
        </div>
    );
}
