
export interface RecentBlock {
    height: number;
    hash: string;
    timestamp: number;
    txsCount: number;
}

export interface RecentTransaction {
    hash: string;
    timestamp: number;
    status: string;
    block_height: number;
    index_in_block: number;
}

export interface Stats {
    latestBlockHeight: number;
    indexedBlocks: number;
    totalTransactions: number;
    totalExtrinsics: number;
    totalContracts: number;
    totalAddresses: number;
}

export interface StatusMessage {
    type: "stats.snapshot";
    timestamp: number;
    stats: Stats;
    recentBlocks: RecentBlock[];
    recentTransactions: RecentTransaction[];
}
