export interface AddressForSearch {
    id: number;
    unshielded_address: string;
    unshielded_address_hex: string;
}

export interface Address extends AddressForSearch {
    created_at: Date;
    updated_at: Date;
}
