import TransactionDetail from "./TransactionDetail";
import GetTransactionByHash from "@/lib/db/GetTransactionByHash";
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
    const transaction = await GetTransactionByHash(hash);

    if (!transaction) {
        return {
            title: "Transaction Not Found - mn-explorer - (Explorer for Midnight Network Preview)",
        };
    }

    return {
        title: `Transaction ${hash.slice(0, 8)}...${hash.slice(-8)} - mn-explorer - (Explorer for Midnight Network Preview)`,
        description: `Transaction details for ${hash} (Block #${transaction.block_height})`,
    };
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await Promise.resolve(params);
    const hash = resolvedParams.hash;
    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
                    <TransactionDetail hash={hash} />
                </div>
            </div>
        </div>
    );
}
