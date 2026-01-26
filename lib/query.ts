
/**
 * 文字列がハッシュかどうかを判定します。
 * @param query 文字列
 * @returns ハッシュかどうか
 */
export function isHash(query: string): boolean
{
    const length = query.length;
    if (length === 66 && query.startsWith("0x")) {
        return isHash(query.substring(2));
    }
    return length === 64 && /^[0-9a-fA-F]{64}$/.test(query);
}

/**
 * 文字列が高さかどうかを判定します。
 * @param query 文字列
 * @returns 高さかどうか
 */
export function isHeight(query: string | number): boolean
{
    if (typeof query === "number") {
        return query >= 0;
    }

    if (typeof query === "string") {
        if (isHash(query)) {
            return false;
        }

        const trimmed = query.trim();
        if (trimmed === "0") {
            return true;
        }
        return trimmed.length > 0 && !trimmed.startsWith("0") && /^[0-9]+$/.test(trimmed);
    }
    return false;
}
