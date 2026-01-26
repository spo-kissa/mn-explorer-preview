import prisma from "@/lib/db";
import { hashToPrefix } from "@/lib/converter";

/**
 * Transaction Output Interface
 */
export interface TransactionOutput {
    index: number;
    account_addr: string;
    asset_id: string;
    value: number;
    shielded: boolean;
    note_commitment: string;
    raw: string;
    address_id: number;
    created_at_tx_hash: string;
    spent_at_tx_hash: string;
    intent_hash: string;
    ctime: number;
    initial_nonce: string;
    registered_for_dust_generation: boolean;
    token_type: string;
    spent_at_transaction_id: number;
    spent_at_transaction_hash: string;
}

/**
 * Get Transaction Output by Transaction ID
 */
export default async function GetTransactionOutputByTxId(txId: number)
: Promise<TransactionOutput[]> {

    const outputs: TransactionOutput[] = await prisma.tx_outputs.findMany({
        where: { tx_id: txId },
        select: {
            index: true,
            account_addr: true,
            asset_id: true,
            value: true,
            shielded: true,
            note_commitment: true,
            raw: true,
            address_id: true,
            created_at_tx_hash: true,
            spent_at_tx_hash: true,
            intent_hash: true,
            ctime: true,
            initial_nonce: true,
            registered_for_dust_generation: true,
            token_type: true,
            spent_at_transaction_id: true,
            spent_at_transaction_hash: true,
        },
        orderBy: {
            index: 'asc',
        },
    });

    if (!outputs) {
        return [];
    }

    return outputs.map((output) => {
        return {
            index: Number(output.index),
            account_addr: output.account_addr,
            asset_id: output.asset_id,
            value: Number(output.value),
            shielded: output.shielded,
            note_commitment: output.note_commitment,
            raw: output.raw,
            address_id: Number(output.address_id),
            created_at_tx_hash: hashToPrefix(output.created_at_tx_hash),
            spent_at_tx_hash: hashToPrefix(output.spent_at_tx_hash),
            intent_hash: hashToPrefix(output.intent_hash),
            ctime: Number(output.ctime),
            initial_nonce: output.initial_nonce,
            registered_for_dust_generation: output.registered_for_dust_generation,
            token_type: output.token_type,
            spent_at_transaction_id: Number(output.spent_at_transaction_id),
            spent_at_transaction_hash: hashToPrefix(output.spent_at_transaction_hash),
        };
    });

}
