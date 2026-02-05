
import ExtrinsicDetail from "@/components/elements/ExtrinsicDetail";
import GetExtrinsicByHash from "@/lib/db/GetExtrinsicByHash";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{
        block_hash: string;
        hash: string;
    }> | {
        block_hash: string;
        hash: string;
    };
}

export async function Page({ params }: PageProps)
: Promise<Metadata>
{
    const resolvedParams = await Promise.resolve(params);
    const block_hash = resolvedParams.block_hash;
    const hash = resolvedParams.hash;

    const extrinsic = await GetExtrinsicByHash(block_hash, hash);

    if (!extrinsic) {
        return {
            title: "Extrinsic Not Found - mn-explorer - (Explorer for Midnight Network Preview)",
        };
    }

    return {
        title: `Extrinsic ${hash.slice(0, 8)}...${hash.slice(-8)} - mn-explorer - (Explorer for Midnight Network Preview)`,
        description: `Extrinsic details for ${hash}`,
    };
}

export default async function ExtrinsicPage({ params }: PageProps) {
    const resolvedParams = await Promise.resolve(params);
    const block_hash = resolvedParams.block_hash;
    const hash = resolvedParams.hash;

    return (
        <div className="flex min-h-full items-start justify-center bg-transparent font-sans">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between py-16 pt-5 px-4 bg-transparent sm:items-start">
                <div className="w-full mb-4">
                    <ExtrinsicDetail block_hash={block_hash} hash={hash} />
                </div>
            </div>
        </div>
    );
}
