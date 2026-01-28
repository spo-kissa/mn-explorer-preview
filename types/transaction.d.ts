

export interface TransactionIdentifier {
    tx_hash: string;
    index_in_tx: number;
    identifier: string;
}

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


export interface Transaction {
    id: number;
    hash: string;
    index_in_block: number;
    timestamp: number;
    is_shielded: boolean;
    total_input: number;
    total_output: number;
    status: string;
    block_height: number;
    block_hash: string;
    protocol_version: number;
    transaction_id: number;
    start_index: number;
    end_index: number;
    unshielded_total_input: number;
    unshielded_total_output: number;
    identifiers: TransactionIdentifier[];
    transaction_inputs: TransactionInput[];
    transaction_outputs: TransactionOutput[];
    raw: string;
    block_ledger_parameters: string;
}
