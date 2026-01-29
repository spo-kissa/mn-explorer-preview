import Link from "next/link";
import { TransactionInput } from "@/lib/db/GetTransactionInputByTxId";
import { TransactionOutput } from "@/lib/db/GetTransactionOutputByTxId";
import { TokenTypes, tokenTypeToName } from "@/lib/converter";
import { formatLovelace } from "@/lib/lovelace";
import CopyToClipboard from "@/components/elements/CopyToClipboard";

export type TransactionIO = TransactionInput | TransactionOutput;

export default function TransactionIO({ io }: { io: TransactionIO }) {
    return (
        <div className="flex flex-col items-center w-full border border-gray-200 dark:border-gray-700 rounded-md p-3 px-4">
            <div className="w-full font-mono text-sm -mb-2">
                #{io.index}
            </div>
            <div className="w-full mb-2">
                <Link href={`/address/${io.address_hex}`}>
                    <span className="font-mono text-xs">{io.account_addr}</span>
                </Link>
                <CopyToClipboard text={io.account_addr} />
            </div>
            <div className="w-full grid grid-cols-3">
                <div className="grid-cols-1 text-xs text-center">
                    {new Date(io.ctime).toLocaleString()}
                </div>
                <div className="grid-cols-1 text-sm flex items-center justify-end gap-2">
                    {io.token_type === TokenTypes.NIGHT && (
                        <svg 
                            width={20} 
                            height={20} 
                            viewBox="0 0 789.37 789.37" 
                            className="fill-black dark:fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m394.69,0C176.71,0,0,176.71,0,394.69s176.71,394.69,394.69,394.69,394.69-176.71,394.69-394.69S612.67,0,394.69,0Zm0,716.6c-177.5,0-321.91-144.41-321.91-321.91S217.18,72.78,394.69,72.78s321.91,144.41,321.91,321.91-144.41,321.91-321.91,321.91Z"/>
                            <rect x="357.64" y="357.64" width="74.09" height="74.09"/>
                            <rect x="357.64" y="240.66" width="74.09" height="74.09"/>
                            <rect x="357.64" y="123.69" width="74.09" height="74.09"/>
                        </svg>
                    )}
                    {tokenTypeToName(io.token_type)}
                </div>
                <div className="grid-cols-1 text-right">
                    <span className="font-mono">{formatLovelace(io.value)}</span>
                </div>
            </div>
        </div>
    );
}
