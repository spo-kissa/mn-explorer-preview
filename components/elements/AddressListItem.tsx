'use client';

import type { AddressWithStats } from "@/types/address";
import CopyToClipboard from "./CopyToClipboard";
import Link from "next/link";

export default function AddressListItem({ address }: { address: AddressWithStats }) {
    return (
        <div className="grid grid-cols-12 border border-zinc-200/50 dark:border-zinc-800/50 rounded-md p-2">
            <div className="col-span-7 flex flex-col">
                <div className="text-sm font-mono dark:text-gray-300">
                    <Link href={`/address/${address.unshielded_address_hex}`}>
                        {address.unshielded_address_hex}
                    </Link>
                    <CopyToClipboard text={address.unshielded_address_hex} />
                </div>
                <div className="text-xs font-mono dark:text-gray-500">
                    <Link href={`/address/${address.unshielded_address_hex}`}>
                        {address.unshielded_address}
                    </Link>
                    <CopyToClipboard text={address.unshielded_address} />
                </div>
            </div>
            <div className="col-span-1 text-sm dark:text-gray-300">
                <div className="h-full w-full flex items-center justify-end">
                    {address.tx_count} txs
                </div>
            </div>
            <div className="col-span-2 text-sm text-right dark:text-gray-300">
                {new Date(address.updated_at).toLocaleString()}
            </div>
            <div className="col-span-2 text-sm text-right dark:text-gray-300">
                {new Date(address.created_at).toLocaleString()}
            </div>
        </div>
    );
}
