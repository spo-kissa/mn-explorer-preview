import prisma from "@/lib/db";
import { Address } from "@/types/address";
import { normalizeId, normalizeTimestamp } from "@/lib/converter";

export default async function GetAddressByHash(hash: string): Promise<Address | null> {

    let normalizedHash = hash.trim().toLowerCase();
    if (normalizedHash.startsWith("0x")) {
        normalizedHash = normalizedHash.slice(2);
    }

    const address = await prisma.addresses.findUnique({
        where: {
            unshielded_address_hex: normalizedHash,
        },
        select: {
            id: true,
            unshielded_address: true,
            unshielded_address_hex: true,
            created_at: true,
            updated_at: true,
        }
    });

    if (!address) {
        return null;
    }
    
    return {
        id: normalizeId(address.id),
        unshielded_address: address.unshielded_address,
        unshielded_address_hex: address.unshielded_address_hex,
        created_at: normalizeTimestamp(address.created_at),
        updated_at: normalizeTimestamp(address.updated_at),
    } as Address;
}
