'use client';

import useGetAddresses from "@/app/hooks/useGetAddresses";
import AddressListItem from "./AddressListItem";

export default function AddressList() {

    const { addresses, isLoading, error } = useGetAddresses();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (addresses.length === 0) {
        return <div>No addresses found</div>;
    }

    return (
        <div className="w-full">

            <div className="w-full flex flex-row justify-end items-center mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Addresses: {addresses.length}</span>
            </div>

            <div className="grid grid-cols-12 border border-zinc-200/50 dark:border-zinc-800/50 rounded-md p-2">
                <div className="col-span-7 flex flex-col">
                    Unshielded Address
                </div>
                <div className="col-span-1 text-sm text-right dark:text-gray-300">
                    Transactions
                </div>
                <div className="col-span-2 text-sm text-right dark:text-gray-300">
                    Last Activity
                </div>
                <div className="col-span-2 text-sm text-right dark:text-gray-300">
                    First Activity
                </div>
            </div>
            <div className="col-span-12">
                    {addresses.map((address, index) => (
                        <AddressListItem key={index} address={address} />
                    ))}
            </div>
        </div>
    );
}
