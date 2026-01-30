import { normalizeId, normalizeIndex, normalizeArray, normalizeArrayFromTo, normalizeHash, normalizeTimestamp, normalizeBoolean, normalizeAmount, normalizeStatus, normalizeHeight, normalizeLedgerParameters, normalizeRaw } from "@/lib/converter";
import { Transaction, TransactionDB, TransactionInput, TransactionOutput, TransactionIdentifier } from "@/types/transaction";

/**
 * トランザクションを正規化します。
 * @param transaction トランザクション
 * @returns 正規化されたトランザクション
 */
export function normalizeTransaction(
    transaction: TransactionDB,
    identifiers: TransactionIdentifier[] = [] as TransactionIdentifier[],
    inputs: TransactionInput[] = [] as TransactionInput[],
    outputs: TransactionOutput[] = [] as TransactionOutput[]
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
        start_index: normalizeIndex(tx.start_index, true),
        end_index: normalizeIndex(tx.end_index, true),
        unshielded_total_input: normalizeAmount(tx.unshielded_total_input),
        unshielded_total_output: normalizeAmount(tx.unshielded_total_output),
        identifiers: normalizeArray<TransactionIdentifier>(identifiers),
        transaction_inputs: normalizeArray<TransactionInput>(inputs),
        transaction_outputs: normalizeArray<TransactionOutput>(outputs),
        raw: normalizeRaw(tx.raw),
        block_ledger_parameters: normalizeLedgerParameters(tx.block_ledger_parameters),

        block_id: normalizeId(tx.block_id),
        fee: normalizeAmount(tx.fee, true),
        paid_fees: tx.paid_fees,
        estimated_fees: tx.estimated_fees,
    } as Transaction;
}

export function normalizeTransactions(
    transactions: TransactionDB[]
)
: Transaction[] {
    return normalizeArrayFromTo<TransactionDB, Transaction>(transactions, (tx) => normalizeTransaction(tx));
}

