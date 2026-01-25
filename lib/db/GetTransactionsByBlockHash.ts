import prisma from "@/lib/db";

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
    
    

    const transactions: Transaction[] = await prisma.transactions.findMany({
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

    return transactions.map((transaction) => ({
        id: Number(transaction.id),
        hash: transaction.hash,
        index_in_block: Number(transaction.index_in_block),
        timestamp: transaction.timestamp.getTime(),
        is_shielded: transaction.is_shielded,
        total_input: Number(transaction.total_input),
        total_output: Number(transaction.total_output),
        status: transaction.status,
        raw: transaction.raw,
        block_height: Number(transaction.block_height),
        block_hash: transaction.block_hash,
        protocol_version: Number(transaction.protocol_version),
        transaction_id: Number(transaction.transaction_id),
        start_index: Number(transaction.start_index),
        end_index: Number(transaction.end_index),
        unshielded_total_input: Number(transaction.unshielded_total_input),
        unshielded_total_output: Number(transaction.unshielded_total_output),
        block_ledger_parameters: transaction.block_ledger_parameters,
    }));
}
