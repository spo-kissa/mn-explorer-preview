import prisma from "@/lib/db";
import type { AddressWithStats, AddressWithStatsDB } from "@/types/address";
import { normalizeArrayFromTo, normalizeCount, normalizeId, normalizeTimestamp } from "../converter";

export default async function GetAddresses(): Promise<AddressWithStats[]> {

    const addresses = await prisma.$queryRaw`
        SELECT A.id AS address_id,
               unshielded_address,
               unshielded_address_hex,
               created_at,
               updated_at,
               COUNT(IO.address_id) AS tx_count,
               MIN(IO.ctime) AS min_time,
               MAX(IO.ctime) AS max_time
        FROM mn_preview_indexer.addresses AS A
        LEFT JOIN
        (
            SELECT address_id, ctime
            FROM mn_preview_indexer.tx_inputs
            UNION ALL
            SELECT address_id, ctime
            FROM mn_preview_indexer.tx_outputs
        ) AS IO ON A.id=IO.address_id
        GROUP BY id, address_id, unshielded_address, unshielded_address_hex, created_at, updated_at
        ORDER BY updated_at DESC
    ` as AddressWithStatsDB[];


    return normalizeArrayFromTo<AddressWithStatsDB, AddressWithStats>(addresses, (a) => {
        return {
            id: normalizeId(a.id),
            unshielded_address: a.unshielded_address,
            unshielded_address_hex: a.unshielded_address_hex,
            created_at: normalizeTimestamp(a.created_at),
            updated_at: normalizeTimestamp(a.updated_at),
            tx_count: normalizeCount(a.tx_count),
            min_time: normalizeTimestamp(a.min_time),
            max_time: normalizeTimestamp(a.max_time),
        } as AddressWithStats;
    }) as AddressWithStats[];
}
