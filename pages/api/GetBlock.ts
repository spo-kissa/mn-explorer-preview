import { NextApiRequest, NextApiResponse } from "next";
import GetBlockByHash from "@/lib/db/GetBlockByHash";
import GetBlockByHeight from "@/lib/db/GetBlockByHeight";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let hash = req.query.hash as string;
    let height = req.query.height as string;
    
    if (height && !isNaN(Number(height))) {
        const block = await GetBlockByHeight(Number(height));
        if (!block) {
            res.status(404).json({ error: "Block not found" });
            return;
        }
        res.status(200).json(block);
        return;
    }

    if (hash && typeof hash === "string") {
        if (hash.length === 66 && hash.startsWith("0x")) {
            hash = hash.slice(2);
        }

        const block = await GetBlockByHash(hash);
        if (!block) {
            res.status(404).json({ error: "Block not found" });
            return;
        }
        res.status(200).json(block);
        return;
    }

    res.status(400).json({ error: "Hash or height is required" });
}