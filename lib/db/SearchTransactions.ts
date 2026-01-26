import prisma from "@/lib/db";
import { Transaction } from "@/lib/db/GetTransactionByHash";
import { isHash } from "@/lib/query";
import { normalizeHash } from "@/lib/converter";
import { normalizeTransaction } from "@/lib/transaction";

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
            protocol_version: true,
            transaction_id: true,
            start_index: true,
            end_index: true,
            unshielded_total_input: true,
            unshielded_total_output: true,
            block_ledger_parameters: true
        }
    });

    if (!transactions || transactions.length === 0) {
        return [] as Transaction[];
    }

    return transactions.map((tx) => normalizeTransaction(tx) as Transaction);
}
