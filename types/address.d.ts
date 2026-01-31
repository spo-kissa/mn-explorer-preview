
export type AddressForSearch = {
    id: number;
    unshielded_address: string;
    unshielded_address_hex: string;
};

export type AddressDB = {
    id: bigint | number;
    unshielded_address: string;
    unshielded_address_hex: string;
    created_at: Date | null;
    updated_at: Date | null;
};


export type Address = AddressForSearch & {
    created_at: number;
    updated_at: number;
};


export type AddressWithStatsDB = AddressDB & {
    tx_count: bigint | number;
    min_time: number | null;
    max_time: number | null;
};


export type AddressWithStats = Address & {
    tx_count: number;
    min_time: number;
    max_time: number;
};
