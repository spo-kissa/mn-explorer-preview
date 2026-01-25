import { NextApiRequest, NextApiResponse } from "next";
import GetTransactionsByBlockHash from "@/lib/db/GetTransactionsByBlockHash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let hash = req.query.hash as string;

    if (hash && typeof hash == "string") {
        if (hash.length === 66 && hash.startsWith("0x")) {
            hash = hash.slice(2);
        }

        const transactions = await GetTransactionsByBlockHash(hash);
        if (!transactions) {
            res.status(404).json({ error: "Transactions not found" });
            return;
        }

        res.status(200).json(transactions);
        return;
    }

    res.status(400).json({ error: "hash is required" });
}
