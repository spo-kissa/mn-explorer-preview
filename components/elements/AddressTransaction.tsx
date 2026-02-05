'use client';

import Link from "next/link";
import { Transaction } from "@/types/transaction";
import CopyToClipboard from "@/components/elements/CopyToClipboard";

export default function AddressTransaction({ index, transaction }: { index: number, transaction: Transaction }) {
    return (
        <Link href={`/transaction/${transaction.hash}`} key={transaction.id}>
            <div className="grid grid-cols-12 w-full border border-t-0 border-gray-200 dark:border-gray-700 p-3 px-4">
                <h2 className="text-sm font-bold col-span-1 text-center">{index + 1}</h2>
                <div className="font-mono text-sm text-gray-500 col-span-8">
                    {transaction.hash}
                    <CopyToClipboard text={transaction.hash} />
                </div>
                <div className="font-mono text-sm text-gray-500 col-span-3 text-right">
                    {new Date(transaction.timestamp).toLocaleString()}
                </div>
            </div>
        </Link>
    );
}
