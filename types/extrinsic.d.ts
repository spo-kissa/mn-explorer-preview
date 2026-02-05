
export type Extrinsic = {
    id: number;
    hash: string;
    block_hash: string;
    index_in_block: number;
    section: string;
    method: string;
    signer: string;
    args: object;
    raw: object;
    data: string | null;
};


export interface ExtrinsicArgs {
    args: string[];
};

