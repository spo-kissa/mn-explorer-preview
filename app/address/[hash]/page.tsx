import GetAddressByHash from "@/lib/db/GetAddressByHash";
import GetTransactionsByAddressId from "@/lib/db/GetTransactionsByAddressId";
import { notFound } from "next/navigation";
import AddressSummary from "@/components/elements/AddressSummary";
import AddressTransaction from "@/components/elements/AddressTransaction";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{
        hash: string;
    }> | {
        hash: string;
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const hash = resolvedParams.hash;
    const address = await GetAddressByHash(hash);

    if (!address) {
        return {
            title: "Address Not Found - mn-explorer - (Explorer for Midnight Network Preview)",
        };
    }

    return {
        title: `Address ${hash.slice(0, 8)}...${hash.slice(-8)} - mn-explorer - (Explorer for Midnight Network Preview)`,
        description: `Address details for ${hash}`,
    };
}

export default async function AddressPage({ params }: PageProps) {
    const resolvedParams = await Promise.resolve(params);
    const hash = resolvedParams.hash;
    const address = await GetAddressByHash(hash);

    if (!address) {
        return notFound();
    }

    const transactions = await GetTransactionsByAddressId(address.id);
    
    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div className="w-full mb-4">
                    <h1 className="text-2xl font-bold mb-4">Address Details</h1>

                    <AddressSummary address={address} />

                </div>
                <div className="w-full">
                    <div className="">
                        <h2 className="text-lg font-bold mb-2">Transactions</h2>
                        <div>
                            <div className="grid grid-cols-12 w-full border rounded-t-md border-gray-200 dark:border-gray-700 p-3 px-4">
                                <h2 className="text-sm font-bold col-span-1 text-center">No.</h2>
                                <h2 className="text-sm font-bold col-span-8 text-cetner">Hash</h2>
                                <h2 className="text-sm font-bold col-span-3 text-center">Timestamp</h2>
                            </div>
                            {transactions.length > 0 ? (
                                transactions.map((tx, index) => (
                                    <AddressTransaction key={tx.id} index={index} transaction={tx} />
                                ))
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 border border-t-0 rounded-b-md border-gray-200 dark:border-gray-700 p-3 px-4">No transactions found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}