import { NextApiRequest, NextApiResponse } from "next";
import getDustLedgerEventsByTxId from "@/lib/db/GetDustLedgerEventsByTxId";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const txIdParam = req.query.txId as string;

    if (!txIdParam) {
        res.status(400).json({ error: "txId is required" });
        return;
    }

    const txId = Number(txIdParam);
    if (isNaN(txId)) {
        res.status(400).json({ error: "txId must be a number" });
        return;
    }

    const events = await getDustLedgerEventsByTxId(txId);
    res.status(200).json(events);
}
