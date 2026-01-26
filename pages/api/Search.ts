import { NextApiRequest, NextApiResponse } from "next";
import { isHash, isHeight } from "@/lib/query";
import GetBlockByHash from "@/lib/db/GetBlockByHash";
import GetBlockByHeight from "@/lib/db/GetBlockByHeight";
import SearchTransactions from "@/lib/db/SearchTransactions";
import { Block } from "@/lib/db/GetBlockByHash";

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
        const blocks = new Array<Block>();
        if (block) {
            blocks.push(block);
        }

        const transactions = await SearchTransactions(query);

        res.status(200).json({
            error: false,
            blocks: blocks,
            transactions: transactions,
        });
        return;
    }
    
    if (isHeight(query)) {
        const block = await GetBlockByHeight(parseInt(query));
        const blocks = new Array<Block>();
        if (block) {
            blocks.push(block);
        }

        res.status(200).json({
            error: false,
            blocks: blocks,
            transactions: [],
        });
        return;
    }
        
    res.status(404).json({
        error: true,
        blocks: [],
        transactions: [],
    });
    return;
}
