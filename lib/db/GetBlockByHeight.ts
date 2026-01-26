import prisma from "@/lib/db";
import { normalizeHash, normalizeJSON, normalizeLedgerParameters, normalizeTimestamp, normalizeBoolean } from "@/lib/converter";

export interface Block {
    height: number;
    hash: string;
    parent_hash: string;
    slot: number;
    timestamp: number;
    tx_count: number;
    state_root: string | null;
    is_finalized: boolean | null;
    raw: string;
    author: string;
    protocol_version: number;
    ledger_parameters: string | null;
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
        hash: normalizeHash(block.hash),
        parent_hash: normalizeHash(block.parent_hash),
        slot: Number(block.slot),
        timestamp: normalizeTimestamp(block.timestamp),
        tx_count: Number(block.tx_count),
        state_root: normalizeHash(block.state_root),
        is_finalized: normalizeBoolean(block.is_finalized),
        raw: normalizeJSON(block.raw),
        author: normalizeHash(block.author),
        protocol_version: Number(block.protocol_version),
        ledger_parameters: normalizeLedgerParameters(block.ledger_parameters),
    };
}
