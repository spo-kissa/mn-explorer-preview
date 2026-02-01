import prisma from "@/lib/db";
import { Transaction } from "@/types/transaction";
import { normalizeTransaction } from "@/lib/transaction";

/**
 * 指定されたアドレスIDに関連するトランザクション一覧を取得する
 * @param addressId アドレスID
 * @returns 指定されたアドレスIDに関連するトランザクション一覧
 */
export default async function GetTransactionsByAddressId(addressId: number): Promise<Transaction[]> {

    const transactions = await prisma.$queryRaw`
        SELECT *
        FROM mn_preview_indexer.transactions
        WHERE id IN (
            SELECT tx_id
            FROM mn_preview_indexer.tx_inputs
            WHERE address_id = ${addressId}
            UNION ALL
            SELECT tx_id
            FROM mn_preview_indexer.tx_outputs
            WHERE address_id = ${addressId}
        )
        ORDER BY block_height DESC
    ` as never[];

    if (!transactions) {
        return [];
    }

    return transactions.map((tx) => {
        return normalizeTransaction(tx) as Transaction;
    });
}
