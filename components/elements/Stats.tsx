"use client";

import { Stats as StatsType } from "@/app/hooks/useStatsWebSocket";
import IconCard from "./IconCard";

const toDataUri = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const latestBlockIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C20.9996 7.64927 20.9044 7.30481 20.725 7L12 2L3.275 7C3.09564 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09564 16.6952 3.275 17L12 22L20.725 17C20.9044 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.275 7L12 12L20.725 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const indexedBlocksIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const txIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 8H17M17 8L13 4M17 8L13 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 16H7M7 16L11 12M7 16L11 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const contractIcon = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 15L11 17L15 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function Stats({ stats }: { stats: StatsType }) {

    return (
        <div className="w-full flex flex-row gap-2 items-center mb-10">
            <IconCard 
                title="Latest Block" 
                value={(stats?.latestBlockHeight?.toLocaleString() ?? 'N/A')} 
                icon={toDataUri(latestBlockIcon)}
            />
            <IconCard 
                title="Indexed Blocks" 
                value={(stats?.indexedBlocks?.toLocaleString() ?? 'N/A')} 
                icon={toDataUri(indexedBlocksIcon)}
            />
            <IconCard 
                title="Total Transactions" 
                value={(stats?.totalTransactions?.toLocaleString() ?? 'N/A')} 
                icon={toDataUri(txIcon)}
            />
            <IconCard 
                title="Total Contracts" 
                value={(stats?.totalContracts?.toLocaleString() ?? 'N/A')} 
                icon={toDataUri(contractIcon)}
            />
        </div>
    );
}
