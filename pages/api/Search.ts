import { NextApiRequest, NextApiResponse } from "next";
import { isHash, isHeight } from "@/lib/query";
import GetBlockByHash from "@/lib/db/GetBlockByHash";
import GetBlockByHeight from "@/lib/db/GetBlockByHeight";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { q } = req.query;
    const { t } = req.query;

    if (!q || typeof q !== "string" || q.trim().length === 0) {
        res.status(404).json({
            type: "error",
            error: "Query is required"
        });
        return;
    }

    const query = q.toString().trim();

    if (isHash(query)) {
        const block = await GetBlockByHash(query);
        res.status(200).json({
            type: "block",
            data: block
        });
        return;
    }
    
    if (isHeight(query)) {
        const block = await GetBlockByHeight(query);
        res.status(200).json({
            type: "block",
            data: block
        });
        return;
    }
    
    res.status(404).json({
        type: "error",
        error: "Invalid query"
    });
    return;
}
