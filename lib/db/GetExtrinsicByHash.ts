import prisma from "@/lib/db";
import { Extrinsic, ExtrinsicArgs } from "@/types/extrinsic";
import { normalizeHash, normalizeId, normalizeObject, normalizeRaw } from "../converter";
import { JsonValue } from "@prisma/client/runtime/client";

/**
 * Extrinsicをhashで取得する
 * @param block_hash ブロックのハッシュ
 * @param hash エクストリンシックのハッシュ
 * @returns Extrinsicオブジェクトまたはnull
 */
export default async function GetExtrinsicByHash(block_hash: string, hash: string)
: Promise<Extrinsic | null>
{
    let normalizedBlockHash = block_hash.trim().toLowerCase();
    if (normalizedBlockHash.startsWith("0x")) {
        normalizedBlockHash = normalizedBlockHash.slice(2);
    }

    let normalizedHash = hash.trim().toLowerCase();
    if (normalizedHash.startsWith("0x")) {
        normalizedHash = normalizedHash.slice(2);
    }

    console.log(`GetExtrinsicByHash: block_hash=${normalizedBlockHash} hash=${normalizedHash}`);

    const extrinsics = await prisma.extrinsics.findMany({
        where: {
            blocks: {
                hash: normalizedBlockHash,
            },
            hash: normalizedHash
        },
        include: {
            blocks: {
                select: {
                    height: true,
                    hash: true,
                    timestamp: true,
                }
            },
        }
    });

    if (extrinsics.length === 0) {
        return null;
    }
    if (extrinsics.length > 1) {
        console.warn(`Multiple extrinsics found for block_hash=${block_hash} hash=${hash}`);
        return null;
    }

    const argsJsonExpander = (args: JsonValue | object): object => {
        const argsObj = args as ExtrinsicArgs;
        return {
            args: argsObj.args.map((arg) => {
                return JSON.parse(arg);
            })
        };
    };

    const extrinsic = extrinsics[0];

    return {
        id: normalizeId(extrinsic.id),
        hash: normalizeHash(extrinsic.hash),
        block_hash: normalizeHash(extrinsic.blocks.hash),
        index_in_block: extrinsic.index_in_block,
        section: extrinsic.section,
        method: extrinsic.method,
        signer: extrinsic.signer ?? "",
        args: argsJsonExpander(extrinsic.args),
        raw: normalizeObject(extrinsic.raw),
        data: extrinsic.data,
    } as Extrinsic;
}
