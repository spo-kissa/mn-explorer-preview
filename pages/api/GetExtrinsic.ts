import { NextApiRequest, NextApiResponse } from "next";
import GetExtrinsicByHash from "@/lib/db/GetExtrinsicByHash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let block_hash = req.query.block_hash as string;
    let hash = req.query.hash as string;

    if (!block_hash || !hash) {
        res.status(400).json({ error: "Block hash and extrinsic hash are required" });
        return;
    }
    
    if (block_hash.length === 66 && block_hash.startsWith("0x")) {
        block_hash = block_hash.slice(2);
    }

    if (hash.length === 66 && hash.startsWith("0x")) {
        hash = hash.slice(2);
    }

    const extrinsic = await GetExtrinsicByHash(block_hash, hash);
    if (!extrinsic) {
        res.status(404).json({ error: "Extrinsic not found" });
        return;
    }

    res.status(200).json(extrinsic);
}
