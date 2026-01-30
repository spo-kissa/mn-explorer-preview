import prisma from "@/lib/db";
import { normalizeTransactions } from "@/lib/transaction";
import { Transaction } from "@/types/transaction";

export default async function GetTransactionsByBlockHeight(blockHeight: number)
: Promise<Transaction[] | null> {

    const transactions = await prisma.transactions.findMany({
        where: { block_height: blockHeight },
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

    if (!transactions) {
        return null;
    }

    return normalizeTransactions(transactions);
}
