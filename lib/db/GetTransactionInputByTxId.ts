import prisma from "@/lib/db";
import { normalizeHash, normalizeIndex, normalizeTimestamp, normalizeAmount, normalizeBoolean, normalizeTokenType, normalizeRaw, normalizeId, normalizeObject } from "@/lib/converter";

/**
 * Transaction Input
 */
export interface TransactionInput {
    index: number;
    prev_tx_hash: string;
    prev_tx_output_tx: number;
    prev_output_id: number;
    raw: object;
    address_id: number;
    created_at_tx_hash: string;
    spent_at_tx_hash: string;
    intent_hash: string;
    ctime: number;
    registered_for_dust_generation: boolean;
    token_type: string;
    token_type_name: string;
    spent_at_transaction_id: number;
    spent_at_transaction_index: number;
    account_addr: string;
    value: number;
    shielded: boolean;
    initial_nonce: string;
}


export default async function GetTransactionInputByTxId(txId: number)
: Promise<TransactionInput[]> {

    const inputs = await prisma.tx_inputs.findMany({
        where: { tx_id: txId },
        select: {
            index: true,
            prev_tx_hash: true,
            prev_tx_output_ix: true,
            prev_output_id: true,
            raw: true,
            address_id: true,
            created_at_tx_hash: true,
            spent_at_tx_hash: true,
            intent_hash: true,
            ctime: true,
            registered_for_dust_generation: true,
            token_type: true,
            spent_at_transaction_id: true,
            spent_at_transaction_hash: true,
            account_addr: true,
            value: true,
            shielded: true,
            initial_nonce: true
        },
        orderBy: {
            index: "asc"
        }
    });

    if (!inputs) {
        return [];
    }

    return inputs.map((input) => {
        return {
            index: normalizeIndex(input.index),
            prev_tx_hash: normalizeHash(input.prev_tx_hash),
            prev_tx_output_tx: Number(input.prev_tx_output_ix),
            prev_output_id: Number(input.prev_output_id),
            address_id: Number(input.address_id),
            created_at_tx_hash: normalizeHash(input.created_at_tx_hash),
            spent_at_tx_hash: normalizeHash(input.spent_at_tx_hash),
            intent_hash: normalizeHash(input.intent_hash),
            ctime: normalizeTimestamp(input.ctime),
            registered_for_dust_generation: input.registered_for_dust_generation,
            token_type: normalizeTokenType(input.token_type),
            spent_at_transaction_id: normalizeId(input.spent_at_transaction_id),
            spent_at_transaction_hash: normalizeHash(input.spent_at_transaction_hash),
            account_addr: input.account_addr,
            value: normalizeAmount(input.value),
            shielded: normalizeBoolean(input.shielded),
            initial_nonce: input.initial_nonce,
            raw: normalizeObject(input.raw),

            token_type_name: '',
            spent_at_transaction_index: 0,
        } as TransactionInput;
    });
}
