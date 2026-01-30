import prisma from "@/lib/db";
import { normalizeHash } from "@/lib/converter";
import { TransactionOutput } from "@/types/transaction";

// /**
//  * Transaction Output Interface
//  */
// export interface TransactionOutput {
//     index: number;
//     account_addr: string;
//     address_hex: string;
//     asset_id: string;
//     value: number;
//     shielded: boolean;
//     note_commitment: string;
//     raw: string;
//     address_id: number;
//     created_at_tx_hash: string;
//     spent_at_tx_hash: string;
//     intent_hash: string;
//     ctime: number;
//     initial_nonce: string;
//     registered_for_dust_generation: boolean;
//     token_type: string;
//     spent_at_transaction_hash: string;
// }

/**
 * Get Transaction Output by Transaction ID
 */
export default async function GetTransactionOutputByTxId(txId: number)
: Promise<TransactionOutput[]> {

    const outputs = await prisma.tx_outputs.findMany({
        where: {
            tx_id: txId
        },
        include: {
            addresses: {
                select: {
                    unshielded_address_hex: true,
                }
            }
        },
        orderBy: {
            index: 'asc',
        },
    });

    if (!outputs || outputs.length === 0) {
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
            created_at_tx_hash: normalizeHash(output.created_at_tx_hash),
            spent_at_tx_hash: normalizeHash(output.spent_at_tx_hash),
            intent_hash: normalizeHash(output.intent_hash),
            ctime: Number(output.ctime),
            initial_nonce: output.initial_nonce,
            registered_for_dust_generation: output.registered_for_dust_generation,
            token_type: output.token_type,
            spent_at_transaction_hash: normalizeHash(output.spent_at_transaction_hash),
            address_hex: output.addresses?.unshielded_address_hex,
        } as TransactionOutput;
    });

}
