import prisma from "@/lib/db";

interface Stats {
    latestBlock: number | null;
    indexedBlocks: number | null;
    totalTransactions: number | null;
}

export default async function GetStats(): Promise<Stats> {
    const latestBlock = await prisma.blocks.findFirst({
        where: {
            is_finalized: true
        },
        orderBy: {
            height: "desc"
        },
        select: {
            height: true,
        }
    });
    const indexedBlocks = await prisma.blocks.count();
    
    const totalTransactions = await prisma.transactions.count();

    return {
        latestBlock: latestBlock?.height ?? null,
        indexedBlocks: indexedBlocks ?? null,
        totalTransactions: totalTransactions ?? null,
    };
}
