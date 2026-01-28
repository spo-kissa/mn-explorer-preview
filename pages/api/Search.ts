import { NextApiRequest, NextApiResponse } from "next";
import { isHash, isHeight } from "@/lib/query";
import GetBlockByHash from "@/lib/db/GetBlockByHash";
import GetBlockByHeight from "@/lib/db/GetBlockByHeight";
import SearchTransactions from "@/lib/db/SearchTransactions";
import SearchAddress from "@/lib/db/SearchAddress";
import { Block } from "@/lib/db/GetBlockByHash";
import { AddressForSearch } from "@/types/address";

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

    if (query.toLowerCase().startsWith("mn_addr_preview")) {
        const address = await SearchAddress(query);
        const addresses = new Array<AddressForSearch>();
        if (address) {
            addresses.push(address);
        }

        res.status(200).json({
            error: false,
            addresses: addresses,
            blocks: [],
            transactions: [],
        });
        return;
    }

    if (isHash(query)) {
        const block = await GetBlockByHash(query);
        const blocks = new Array<Block>();
        if (block) {
            blocks.push(block);
        }

        const transactions = await SearchTransactions(query);

        res.status(200).json({
            error: false,
            addresses: [],
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
            addresses: [],
            blocks: blocks,
            transactions: [],
        });
        return;
    }
        
    res.status(404).json({
        error: true,
        addresses: [],
        blocks: [],
        transactions: [],
    });
    return;
}
