import { isHash } from "@/lib/query";

/**
 * ハッシュの先頭に0xを追加する
 * すでに0xがある場合はそのまま返す
 * 空文字列の場合はnullを返す
 */
export function hashToPrefix(hash: string | null | undefined): string | null {

    if (hash === null || hash === undefined || hash.length === 0) {
        return null;
    }
    if (hash.startsWith('0x')) {
        return hash.toLowerCase();
    }
    return '0x' + hash.toLowerCase();
}

/**
 * ハッシュを正規化します。
 * @param hash ハッシュ
 * @returns 正規化されたハッシュ
 */
export function normalizeHash(hash: string): string | null {
    if (!isHash(hash)) {
        return null;
    }
    return hashToPrefix(hash);
}

/**
 * 高さを正規化します。
 * @param height 高さ
 * @returns 正規化された高さ
 */
export function normalizeHeight(height: number): number | null {
    if (height < 0) {
        return null;
    }
    return Number(height);
}

/**
 * タイムスタンプを正規化します。
 * @param timestamp タイムスタンプ
 * @returns 正規化されたタイムスタンプ
 */
export function normalizeTimestamp(timestamp: Date | number): number | null {
    if (timestamp instanceof Date) {
        return Number(timestamp.getTime());
    }
    if (typeof timestamp === 'number') {
        return Number(timestamp);
    }
    return null;
}

/**
 * IDを正規化します。
 * @param id ID
 * @returns 正規化されたID
 */
export function normalizeId(id: number): number | null {
    if (id <= 0) {
        return null;
    }
    return Number(id);
}

/**
 * インデックスを正規化します。
 * @param index インデックス
 * @returns 正規化されたインデックス
 */
export function normalizeIndex(index: number): number | null {
    if (index < 0) {
        return null;
    }
    return Number(index);
}

/**
 * 金額を正規化します。
 * @param amount 金額
 * @returns 正規化された金額
 */
export function normalizeAmount(amount: number): number | null {
    if (amount < 0) {
        return null;
    }
    return Number(amount);
}

/**
 * 真偽値を正規化します。
 * @param value 真偽値
 * @returns 正規化された真偽値
 */
export function normalizeBoolean(value: boolean): boolean | null {
    return Boolean(value);
}

/**
 * ステータスを正規化します。
 * @param status ステータス
 * @returns 正規化されたステータス
 */
export function normalizeStatus(status: string | null): string {
    if (status === null || status.length === 0) {
        return "UNKNOWN";
    }
    return status.toUpperCase();
}

/**
 * 生データを正規化します。
 * @param raw 生データ
 * @returns 正規化された生データ
 */
export function normalizeRaw(raw: string): string | null {
    if (raw.length === 0) {
        return null;
    }
    return raw;
}

/**
 * ブロックレジスタスパラメータを正規化します。
 * @param ledgerParameters ブロックレジスタスパラメータ
 * @returns 正規化されたブロックレジスタスパラメータ
 */
export function normalizeLedgerParameters(ledgerParameters: string): string | null {
    if (ledgerParameters.length === 0) {
        return null;
    }
    return ledgerParameters.toLowerCase();
}

/**
 * 配列を正規化します。
 * @param array 配列
 * @param normalizer 正規化関数
 * @returns 正規化された配列
 */
export function normalizeArray<T>(array: T[] | null | undefined, normalizer?: (item: T) => T): T[] {
    if (array === null || array === undefined || !Array.isArray(array) || array.length === 0) {
        return [] as T[];
    }
    if (normalizer === null || normalizer === undefined || typeof normalizer !== 'function') {
        return array as T[];
    }
    return array.map(item => normalizer(item));
}

/**
 * トークンタイプの定数
 */
export enum TokenTypes {
    UNKNOWN = 'UNKNOWN',
    NIGHT = '0000000000000000000000000000000000000000000000000000000000000000',
}

/**
 * トークンタイプを名前に変換します。
 * @param tokenType トークンタイプ
 * @returns 名前
 */
export function tokenTypeToName(tokenType: string): string {
    switch (tokenType) {
        case TokenTypes.NIGHT:
            return "NIGHT";
        default:
            return "UNKNOWN";
    }
}

