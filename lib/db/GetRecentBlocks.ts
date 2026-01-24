import prisma from "@/lib/db";

interface RecentBlock {
    height: number;
    hash: string;
    timestamp: Date;
    txsCount: number;
}

export default async function GetRecentBlocks(count: number = 10): Promise<RecentBlock[]> {
    if (count < 1 || count > 100) {
        throw new Error("Count must be between 1 and 100");
    }

    const blocks = await prisma.blocks.findMany({
        orderBy: {
            height: "desc"
        },
        take: count,
        select: {
            height: true,
            hash: true,
            timestamp: true,
            tx_count: true,
        }
    });

    return blocks.map((block) => ({
        height: Number(block.height),
        hash: '0x' + block.hash,
        timestamp: Number(block.timestamp.getTime()),
        txsCount: Number(block.tx_count),
    }));
}
