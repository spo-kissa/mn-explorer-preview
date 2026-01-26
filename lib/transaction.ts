import { Transaction } from "@/lib/db/GetTransactionByHash";
import { normalizeId, normalizeIndex, normalizeArray, normalizeHash, normalizeTimestamp, normalizeBoolean, normalizeAmount, normalizeStatus, normalizeHeight, normalizeLedgerParameters, normalizeRaw } from "@/lib/converter";

/**
 * トランザクションを正規化します。
 * @param transaction トランザクション
 * @returns 正規化されたトランザクション
 */
export function normalizeTransaction(
    transaction: Transaction
): Transaction
{
    const tx = transaction;

    return {
        id: normalizeId(tx.id),
        hash: normalizeHash(tx.hash),
        index_in_block: normalizeIndex(tx.index_in_block),
        timestamp: normalizeTimestamp(tx.timestamp),
        is_shielded: normalizeBoolean(tx.is_shielded),
        total_input: normalizeAmount(tx.total_input),
        total_output: normalizeAmount(tx.total_output),
        status: normalizeStatus(tx.status),
        block_height: normalizeHeight(tx.block_height),
        block_hash: normalizeHash(tx.block_hash),
        protocol_version: Number(tx.protocol_version),
        transaction_id: normalizeId(tx.transaction_id),
        start_index: normalizeIndex(tx.start_index),
        end_index: normalizeIndex(tx.end_index),
        unshielded_total_input: normalizeAmount(tx.unshielded_total_input),
        unshielded_total_output: normalizeAmount(tx.unshielded_total_output),
        identifiers: normalizeArray(tx.identifiers),
        transaction_inputs: normalizeArray(tx.transaction_inputs),
        transaction_outputs: normalizeArray(tx.transaction_outputs),
        raw: normalizeRaw(tx.raw),
        block_ledger_parameters: normalizeLedgerParameters(tx.block_ledger_parameters),
    }
}

export function normalizeTransactions(
    transactions: Transaction[]
)
: Transaction[] {
    return normalizeArray(transactions, (tx) => normalizeTransaction(tx));
}
