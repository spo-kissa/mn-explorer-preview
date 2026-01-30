import prisma from "@/lib/db";
import { TransactionInput } from "@/types/transaction";
import { normalizeIndex, normalizeHash, normalizeTimestamp, normalizeTokenType, normalizeAmount, normalizeBoolean, normalizeObject } from "@/lib/converter";

/**
 * 指定されたアドレスIDに関連するトランザクション入力一覧を取得する
 * @deprecated 使用しない
 * @param addressId アドレスID
 * @returns 指定されたアドレスIDに関連するトランザクション入力一覧
 */
export default async function GetTransactionInputsByAddressId(addressId: number): Promise<TransactionInput[]> {
    const transactionInputs = await prisma.tx_inputs.findMany({
        where: {
            address_id: addressId,
        },
        select: {
            tx_id: true,
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
            spent_at_transaction_hash: true,
            account_addr: true,
            value: true,
            shielded: true,
            initial_nonce: true
        },
        orderBy: [
            { tx_id: "desc" },
            { index: "desc" },
        ]
    });

    if (!transactionInputs) {
        return [];
    }

    return transactionInputs.map((input) => {
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
            spent_at_transaction_hash: normalizeHash(input.spent_at_transaction_hash),
            account_addr: input.account_addr,
            value: normalizeAmount(input.value),
            shielded: normalizeBoolean(input.shielded),
            initial_nonce: input.initial_nonce,
            raw: normalizeObject(input.raw),

            token_type_name: '',
            spent_at_transaction_index: 0,
            address_hex: null,
        } as TransactionInput;
    });
}
