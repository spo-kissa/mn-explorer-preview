import prisma from "@/lib/db";

export interface Block {
    height: number;
    hash: string;
    parent_hash: string;
    slot: number;
    timestamp: number;
    tx_count: number;
    state_root: string;
    is_finalized: boolean;
    raw: string;
    author: string;
    protocol_version: number;
    ledger_parameters: string;
}

export default async function GetBlockByHeight(height: number): Promise<Block | null> {
    const block = await prisma.blocks.findUnique({
        where: { height: height },
        select: {
            height: true,
            hash: true,
            parent_hash: true,
            slot: true,
            timestamp: true,
            tx_count: true,
            state_root: true,
            is_finalized: true,
            raw: true,
            author: true,
            protocol_version: true,
            ledger_parameters: true,
        }
    });

    if (!block) {
        return null;
    }

    return {
        height: Number(block.height),
        hash: '0x' + block.hash,
        parent_hash: '0x' + block.parent_hash,
        slot: Number(block.slot),
        timestamp: Number(block.timestamp.getTime()),
        tx_count: Number(block.tx_count),
        state_root: block.state_root,
        is_finalized: block.is_finalized,
        raw: block.raw,
        author: block.author,
        protocol_version: Number(block.protocol_version),
        ledger_parameters: block.ledger_parameters,
    };
}
