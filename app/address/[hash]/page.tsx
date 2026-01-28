import GetAddressByHash from "@/lib/db/GetAddressByHash";
import { notFound } from "next/navigation";
import { useI18n } from "@/i18n";

interface PageProps {
    params: Promise<{
        hash: string;
    }> | {
        hash: string;
    };
}

export default async function AddressPage({ params }: PageProps) {
    const resolvedParams = await Promise.resolve(params);
    const hash = resolvedParams.hash;
    const address = await GetAddressByHash(hash);

    if (!address) {
        return notFound();
    }
    
    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">Address Details</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <h2 className="text-lg font-bold mb-2">Address</h2>
                            <p className="text-sm text-gray-500">{address.unshielded_address}</p>
                        </div>
                        <div className="col-span-1">
                            <h2 className="text-lg font-bold mb-2">Address Hex</h2>
                            <p className="text-sm text-gray-500">{address.unshielded_address_hex}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}