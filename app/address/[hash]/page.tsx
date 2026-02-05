import GetAddressByHash from "@/lib/db/GetAddressByHash";
import GetTransactionsByAddressId from "@/lib/db/GetTransactionsByAddressId";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AddressDetail from "@/components/elements/AddressDetail";

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
    
    return <AddressDetail address={address} transactions={transactions} />;
}
