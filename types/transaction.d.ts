import { Decimal } from "@prisma/client/runtime/client";

export type TxId = number;

export interface TransactionIdentifier {
    tx_hash: string;
    index_in_tx: number;
    identifier: string;
}

export type TransactionInput = {
    index: number;
    prev_tx_hash: string;
    prev_tx_output_tx: number;
    prev_output_id: number;
    raw: object;
    address_id: number;
    address_hex: string | null;
    created_at_tx_hash: string;
    spent_at_tx_hash: string;
    intent_hash: string;
    ctime: number;
    registered_for_dust_generation: boolean;
    token_type: string;
    token_type_name: string;
    spent_at_transaction_index: number;
    account_addr: string;
    value: number;
    shielded: boolean;
    initial_nonce: string;
};

export type TransactionOutput = {
    index: number;
    account_addr: string;
    asset_id: string;
    value: number;
    shielded: boolean;
    note_commitment: string;
    raw: string;
    address_id: number;
    address_hex: string | null;
    created_at_tx_hash: string;
    spent_at_tx_hash: string;
    intent_hash: string;
    ctime: number;
    initial_nonce: string;
    registered_for_dust_generation: boolean;
    token_type: string;
    spent_at_transaction_hash: string;
};


export type TransactionIO = (TransactionInput | TransactionOutput);


export interface DustLedgerEvent {
    id: number;
    tx_id: number;
    index_in_tx: number;
    event_id: number;
    event_name: string | null;
    event_raw: string;
    output_nonce: string | null;
}


export interface TransactionDB {
    id: number | bigint;
    hash: string;
    block_id: number | bigint;
    index_in_block: number;
    timestamp: Date;
    is_shielded: boolean;
    fee: number | Decimal | null;
    total_input: number | Decimal | null;
    total_output: number | Decimal | null;
    status: string | null;
    raw: string;
    block_height: number | bigint | null;
    block_hash: string | null;
    protocol_version: number;
    transaction_id: number | bigint | null;
    start_index: number | null;
    end_index: number | null;
    paid_fees: string | null;
    estimated_fees: string | null;
    unshielded_total_input: number | Decimal;
    unshielded_total_output: number | Decimal;
    block_ledger_parameters: string | null;
}

export interface Transaction {
    id: number;
    hash: string;
    block_id: number;
    index_in_block: number;
    timestamp: number;
    is_shielded: boolean;
    fee: number | null;
    total_input: number;
    total_output: number;
    status: string;
    block_height: number;
    block_hash: string;
    protocol_version: number;
    transaction_id: number;
    start_index: number | null;
    end_index: number | null;
    paid_fees: string;
    estimated_fees: string;
    unshielded_total_input: number;
    unshielded_total_output: number;
    identifiers: TransactionIdentifier[];
    transaction_inputs: TransactionInput[];
    transaction_outputs: TransactionOutput[];
    raw: string;
    block_ledger_parameters: string;
}
