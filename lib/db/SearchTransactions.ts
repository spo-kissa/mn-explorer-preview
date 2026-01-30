import prisma from "@/lib/db";
import { type Transaction } from "@/types/transaction";
import { isHash } from "@/lib/query";
import { normalizeHash } from "@/lib/converter";
import { normalizeTransactions } from "@/lib/transaction";

/**
 * トランザクションを検索します。
 * @param hash ハッシュ
 * @returns トランザクション
 */
export default async function SearchTransactions(hash: string)
: Promise<Transaction[]> {

    if (!isHash(hash)) {
        return [];
    }

    const normalizedHash = normalizeHash(hash).slice(2);
    if (!normalizedHash) {
        return [];
    }

    const transactions = await prisma.transactions.findMany({
        where: {
            hash: normalizedHash,
        },
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
            block_id: true,
            protocol_version: true,
            transaction_id: true,
            start_index: true,
            end_index: true,
            fee: true,
            paid_fees: true,
            estimated_fees: true,
            unshielded_total_input: true,
            unshielded_total_output: true,
            block_ledger_parameters: true
        }
    });

    if (!transactions || transactions.length === 0) {
        return [] as Transaction[];
    }

    return normalizeTransactions(transactions);
}
