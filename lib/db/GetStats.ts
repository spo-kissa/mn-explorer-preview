import prisma from "@/lib/db";
import type { Stats } from "@/types/stats";

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

    const totalExtrinsics = await prisma.extrinsics.count();

    const totalContracts = await prisma.tx_contract_actions.count();

    const totalAddresses = await prisma.addresses.count();

    return {
        latestBlockHeight: Number(latestBlock?.height ?? 0),
        indexedBlocks: Number(indexedBlocks),
        totalTransactions: Number(totalTransactions),
        totalExtrinsics: Number(totalExtrinsics),
        totalContracts: Number(totalContracts),
        totalAddresses: Number(totalAddresses),
    };
}
