import { useState, useEffect, useCallback } from "react";
import { AddressWithStats } from "@/types/address";

export interface UseGetAddressesResult {
    addresses: AddressWithStats[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

export default function useGetAddresses(): UseGetAddressesResult {
    const [addresses, setAddresses] = useState<AddressWithStats[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fetchAddresses = useCallback(async () => {

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/GetAddresses`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAddresses(data);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to fetch addresses";
            setError(errorMessage);
            setAddresses([] as AddressWithStats[]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    return {
        addresses,
        isLoading,
        error,
        refetch: fetchAddresses,
    };
}
