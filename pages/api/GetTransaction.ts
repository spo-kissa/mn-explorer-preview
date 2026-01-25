import { NextApiRequest, NextApiResponse } from "next";
import GetTransactionByHash from "@/lib/db/GetTransactionByHash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let hash = req.query.hash as string;

    if (!hash) {
        res.status(400).json({ error: "Hash is required" });
        return;
    }
    
    if (hash.length === 66 && hash.startsWith("0x")) {
        hash = hash.slice(2);
    }

    const transaction = await GetTransactionByHash(hash);
    if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
    }

    res.status(200).json(transaction);
}