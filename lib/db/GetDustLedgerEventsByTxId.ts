import prisma from "@/lib/db";
import { DustLedgerEvent, TxId } from "@/types/transaction";
import { normalizeId, normalizeIndex } from "../converter";

export default async function GetDustLedgerEventsByTxId(txId: TxId)
: Promise<DustLedgerEvent[]>
{
    const events = await prisma.tx_dust_ledger_events.findMany({
        where: {
            tx_id: txId,
        },
    });

    if (!events || events.length === 0) {
        return [];
    }

    return events.map((e) => {
        return {
            id: normalizeId(e.id),
            tx_id: normalizeId(e.tx_id),
            index_in_tx: normalizeIndex(e.index_in_tx),
            event_id: normalizeId(e.event_id),
            event_name: e.event_name,
            event_raw: e.event_raw,
            output_nonce: e.output_nonce,
        } as DustLedgerEvent;
    }) as DustLedgerEvent[];
}
