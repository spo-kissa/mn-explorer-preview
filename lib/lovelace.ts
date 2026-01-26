import BigNumber from "bignumber.js";

BigNumber.config({
    FORMAT: {
        groupSize: 3,
        groupSeparator: ",",
        decimalSeparator: ".",
    },
});


export function formatLovelace(
    lovelace: BigNumber.Value,
    opts?: {
        fractionDigits?: number;
        fallback?: string;
    }
): string {

    let value = Number(lovelace);

    value = value / 1000000;
    
    const fractionDigits = opts?.fractionDigits ?? 6;
    const fallback = opts?.fallback ?? "-";

    if (lovelace === null || lovelace === undefined) {
        return fallback;
    }

    const bn = new BigNumber(value);

    if (!bn.isFinite()) {
        return fallback;
    }

    return bn.toFormat(fractionDigits, BigNumber.ROUND_HALF_UP);
}
