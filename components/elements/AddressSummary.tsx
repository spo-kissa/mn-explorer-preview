'use client';

import { Address } from "@/types/address";
import CopyToClipboard from "@/components/elements/CopyToClipboard";

export default function AddressSummary({ address }: { address: Address }) {
    return (
        <div className="flex flex-col items-center w-full border border-gray-200 dark:border-gray-700 rounded-md p-3 px-4">
            <div className="w-full">
                <h2 className="text-lg font-bold">Address</h2>
                <p className="font-mono text-sm text-gray-500 mb-2">
                    {address.unshielded_address}
                    <CopyToClipboard text={address.unshielded_address} />
                </p>
            </div>
            <div className="w-full">
                <h2 className="text-lg font-bold">Hex</h2>
                <p className="font-mono text-sm text-gray-500">
                    {address.unshielded_address_hex}
                    <CopyToClipboard text={address.unshielded_address_hex} />
                </p>
            </div>
        </div>
    );
}