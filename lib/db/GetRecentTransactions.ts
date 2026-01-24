import prisma from "@/lib/db";

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
        orderBy: [
            { timestamp: "desc" },
            { index_in_block: "desc" }
        ],
        take: count,
        select: {
            hash: true,
            timestamp: true,
            status: true,
            block_height: true,
            index_in_block: true,
        }
    });

    return transactions.map((transaction) => ({
        hash: '0x' + transaction.hash,
        timestamp: Number(transaction.timestamp.getTime()),
        status: transaction.status,
        block_height: Number(transaction.block_height),
        index_in_block: Number(transaction.index_in_block),
    }));
}
