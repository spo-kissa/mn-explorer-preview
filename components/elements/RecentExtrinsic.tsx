import type { RecentExtrinsic as RecentExtrinsicType } from "@/types/stats";
import Hash from "./client/Hash";
import DateTime from "./DateTime";
import Link from "next/link";
import { ExtrinsicColor } from "./ExtrinsicColor";

export default function RecentExtrinsics({ ext }: { ext: RecentExtrinsicType })
{
    return (
        <Link href={`/extrinsic/${ext.block_hash}/${ext.hash}`} className="hover:opacity-80 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors transition-opacity w-full">
            <li className="flex flex-row gap-1 items-center justify-between border border-gray-700 rounded-md px-2 py-2 w-full">
                <dl className="flex flex-row gap-2 items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <dt className="text-mono text-[11px] font-medium text-gray-500 dark:text-gray-300 w-fit border border-gray-500 rounded-md px-1 py-0.5">
                            #{ext.height.toLocaleString()}
                        </dt>
                        <dd className="font-mono text-xs">
                            <Hash hash={ext.hash} />
                        </dd>
                    </div>
                    <div className="flex flex-col gap-2 items-end justify-end">
                        <dd className="text-mono text-xs">
                            <DateTime timestamp={ext.timestamp} />
                        </dd>
                        <dd className={`text-mono text-[11px]`}>
                            <ExtrinsicColor section={ext.section} method={ext.method} />
                        </dd>
                    </div>
                </dl>
            </li>
        </Link>
    );
}
