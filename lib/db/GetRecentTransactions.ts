import prisma from "@/lib/db";
import { normalizeHash, normalizeTimestamp, normalizeHeight, normalizeIndex, normalizeStatus } from "@/lib/converter";

interface RecentTransaction {
    hash: string;
    timestamp: number;
    status: string;
    block_height: number;
    index_in_block: number;
}

export default async function GetRecentTransactions(count: number = 10): Promise<RecentTransaction[]> {
    if (count < 1 || count > 100) {
        throw new Error("Count must be between 1 and 100");
    }

    const transactions = await prisma.transactions.findMany({
        select: {
            hash: true,
            timestamp: true,
            status: true,
            block_height: true,
            index_in_block: true,
        },
        orderBy: [
            { timestamp: "desc" },
            { index_in_block: "desc" }
        ],
        take: count
    });

    return transactions.map((transaction) => ({
        hash: normalizeHash(transaction.hash),
        timestamp: normalizeTimestamp(transaction.timestamp),
        status: normalizeStatus(transaction.status),
        block_height: normalizeHeight(transaction.block_height),
        index_in_block: normalizeIndex(transaction.index_in_block, false) ?? 0,
    }));
}
