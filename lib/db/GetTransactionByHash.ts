import prisma from "@/lib/db";
import { normalizeTransaction } from "@/lib/transaction";
import { normalizeHash, normalizeId } from "@/lib/converter";
import { type TransactionDB, type Transaction, type TransactionIdentifier } from "@/types/transaction";
import GetTransactionInputByTxId from "@/lib/db/GetTransactionInputByTxId";
import GetTransactionOutputByTxId from "@/lib/db/GetTransactionOutputByTxId";

// /**
//  * Transaction Identifier
//  */
// export interface TransactionIdentifier {
//     tx_hash: string;
//     index_in_tx: number;
//     identifier: string;
// }

// /**
//  * Transaction
//  */
// export interface Transaction {
//     id: number;
//     hash: string;
//     index_in_block: number;
//     timestamp: number;
//     is_shielded: boolean;
//     total_input: number;
//     total_output: number;
//     status: string;
//     block_height: number;
//     block_hash: string;
//     protocol_version: number;
//     transaction_id: number;
//     start_index: number;
//     end_index: number;
//     unshielded_total_input: number;
//     unshielded_total_output: number;
//     identifiers: TransactionIdentifier[];
//     transaction_inputs: TransactionInput[];
//     transaction_outputs: TransactionOutput[];
//     raw: string;
//     block_ledger_parameters: string;
// }

export default async function GetTransactionByHash(hash: string)
: Promise<Transaction | null> {

    const transaction = await prisma.transactions.findUnique({
        where: { hash: hash},
        select: {
            id: true,
            hash: true,
            index_in_block: true,
            timestamp: true,
            is_shielded: true,
            total_input: true,
            total_output: true,
            status: true,
            block_height: true,
            block_hash: true,
            protocol_version: true,
            transaction_id: true,
            start_index: true,
            end_index: true,
            unshielded_total_input: true,
            unshielded_total_output: true,
            raw: true,
            block_ledger_parameters: true
        }
    }) as TransactionDB | null;

    if (!transaction) {
        return null;
    }

    let identifiers = await prisma.tx_identifiers.findMany({
        where: { tx_id: transaction.id },
        select: {
            tx_hash: true,
            index_in_tx: true,
            identifier: true
        },
        orderBy: {
            index_in_tx: "asc"
        }
    });

    if (!identifiers) {
        identifiers = [];
    }

    const tx = transaction;
    const id = normalizeId(transaction.id);

    const txIdentifiers = identifiers.map((id) => {
        return {
            tx_hash: normalizeHash(id.tx_hash),
            index_in_tx: Number(id.index_in_tx) + 1,
            identifier: id.identifier
        } as TransactionIdentifier;
    });

    const txInputs = await GetTransactionInputByTxId(id);
    const txOutputs = await GetTransactionOutputByTxId(id);

    return normalizeTransaction(tx, txIdentifiers, txInputs, txOutputs);
}
