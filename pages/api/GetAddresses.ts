import { NextApiRequest, NextApiResponse } from "next";
import GetAddresses from "@/lib/db/GetAddresses";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const addresses = await GetAddresses();
    res.status(200).json(addresses);
}
