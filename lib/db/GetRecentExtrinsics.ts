import prisma from "@/lib/db";
import { normalizeHash, normalizeHeight, normalizeIndex, normalizeTimestamp } from "../converter";
import { RecentExtrinsic } from "@/types/stats";


export default async function GetRecentExtrinsics(count: number = 10)
: Promise<RecentExtrinsic[]>
 {
    if (count < 1 || count > 100) {
        throw new Error("Count must be between 1 and 100");
    }

    const extrinsics = await prisma.extrinsics.findMany({
       include: {
            blocks: {
                select: {
                    hash: true,
                    height: true,
                    timestamp: true,
                }
            }
        },
        orderBy: [
            { blocks: { height: "desc" } },
            { index_in_block: "desc" }
        ],
        take: count
    });

    if (!extrinsics || extrinsics.length === 0) {
        return [];
    }

    return extrinsics.map((extrinsic) => ({
        hash: normalizeHash(extrinsic.hash),
        section: extrinsic.section,
        method: extrinsic.method,
        index_in_block: normalizeIndex(extrinsic.index_in_block, false) ?? 0,
        height: normalizeHeight(extrinsic.blocks.height),
        timestamp: normalizeTimestamp(extrinsic.blocks.timestamp),
        block_hash: normalizeHash(extrinsic.blocks.hash),
    }));
 }
