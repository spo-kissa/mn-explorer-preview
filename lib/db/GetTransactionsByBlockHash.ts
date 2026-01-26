import prisma from "@/lib/db";
import { normalizeTransaction } from "@/lib/transaction";

export interface Transaction {
    id: number;
    hash: string;
    index_in_block: number;
    timestamp: number;
    is_shielded: boolean;
    total_input: number;
    total_output: number;
    status: string;
    raw: string;
    block_height: number;
    block_hash: string;
    protocol_version: number;
    transaction_id: number;
    start_index: number;
    end_index: number;
    unshielded_total_input: number;
    unshielded_total_output: number;
    block_ledger_parameters: string;
}

export default async function GetTransactionsByBlockHash(blockHash: string)
: Promise<Transaction[] | null> {

    const transactions = await prisma.transactions.findMany({
        where: { block_hash: blockHash },
        select: {
            id: true,
            hash: true,
            index_in_block: true,
            timestamp: true,
            is_shielded: true,
            total_input: true,
            total_output: true,
            status: true,
            raw: true,
            block_height: true,
            block_hash: true,
            protocol_version: true,
            transaction_id: true,
            start_index: true,
            end_index: true,
            unshielded_total_input: true,
            unshielded_total_output: true,
            block_ledger_parameters: true
        }
    });

    if (!transactions) {
        return null;
    }

    return transactions.map((tx) => {
        return normalizeTransaction(tx) as Transaction;
        // return {
        //     id: Number(tx.id),
        //     hash: tx.hash,
        //     index_in_block: Number(tx.index_in_block),
        //     timestamp: tx.timestamp.getTime(),
        //     is_shielded: tx.is_shielded,
        //     total_input: Number(tx.total_input),
        //     total_output: Number(tx.total_output),
        //     status: tx.status,
        //     raw: tx.raw,
        //     block_height: Number(tx.block_height),
        //     block_hash: tx.block_hash,
        //     protocol_version: Number(tx.protocol_version),
        //     transaction_id: Number(tx.transaction_id),
        //     start_index: Number(tx.start_index),
        //     end_index: Number(tx.end_index),
        //     unshielded_total_input: Number(tx.unshielded_total_input),
        //     unshielded_total_output: Number(tx.unshielded_total_output),
        //     block_ledger_parameters: tx.block_ledger_parameters,
        // } as Transaction;
    });
}
