import prisma from "@/lib/db";
import { AddressForSearch } from "@/types/address";
import { normalizeId } from "@/lib/converter";

export default async function SearchAddress(query: string)
: Promise<AddressForSearch | null> {

    const normalizedAddress = query.trim().toLowerCase();
    if (!normalizedAddress) {
        return null;
    }

    const address = await prisma.addresses.findUnique({
        where: {
            unshielded_address: normalizedAddress,
        },
        select: {
            id: true,
            unshielded_address: true,
            unshielded_address_hex: true,
        }
    });

    if (!address) {
        return null;
    }

    return {
        id: normalizeId(address.id),
        unshielded_address: address.unshielded_address,
        unshielded_address_hex: address.unshielded_address_hex,
    } as AddressForSearch;
}
