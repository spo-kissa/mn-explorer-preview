import { isHash } from "@/lib/query";
import BigNumber from "bignumber.js";

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
export function normalizeHash(hash: string | null): string {
    if (hash === null || hash === undefined || !isHash(hash)) {
        return '0x' + "0".repeat(64);
    }
    hash = hashToPrefix(hash);
    if (hash === null) {
        return '0x' + "0".repeat(64);
    }
    return hash;
}

/**
 * 高さを正規化します。
 * @param height 高さ
 * @returns 正規化された高さ
 */
export function normalizeHeight(height: number | bigint | null): number {
    if (height === null || height < 0) {
        throw new Error("Height must be greater than 0");
    }
    return Number(height);
}

/**
 * タイムスタンプを正規化します。
 * @param timestamp タイムスタンプ
 * @returns 正規化されたタイムスタンプ
 */
export function normalizeTimestamp(timestamp: Date | number | null): number {
    if (timestamp instanceof Date) {
        return Number(timestamp.getTime());
    }
    if (typeof timestamp === 'number') {
        return Number(timestamp);
    }
    return 0;
}

/**
 * IDを正規化します。
 * @param id ID
 * @returns 正規化されたID
 */
export function normalizeId(id: number | bigint | null): number {
    if (id === null || id <= 0) {
        return 0;
    }
    return Number(id);
}

/**
 * インデックスを正規化します。
 * @param index インデックス
 * @returns 正規化されたインデックス
 */
export function normalizeIndex(index: number): number {
    if (index < 0) {
        throw new Error("Index must be greater than 0");
    }
    return Number(index);
}

/**
 * 金額を正規化します。
 * @param amount 金額
 * @returns 正規化された金額
 */
export function normalizeAmount(amount: BigNumber | number | { toNumber: () => number } | null): number {
    if (amount === null) {
        throw new Error("Amount must be greater than 0");
    }
    // PrismaのDecimal型やtoNumberメソッドを持つオブジェクトの場合
    if (typeof amount === 'object' && amount !== null && 'toNumber' in amount && typeof amount.toNumber === 'function') {
        const num = amount.toNumber();
        if (num < 0) {
            throw new Error("Amount must be greater than 0");
        }
        return num;
    }
    // BigNumberの場合（toNumberメソッドを持つが、上記のチェックで処理される）
    // numberの場合
    if (typeof amount === 'number') {
        if (amount < 0) {
            throw new Error("Amount must be greater than 0");
        }
        return Number(amount);
    }
    throw new Error("Amount must be a number, BigNumber, or Decimal");
}

/**
 * 真偽値を正規化します。
 * @param value 真偽値
 * @returns 正規化された真偽値
 */
export function normalizeBoolean(value: boolean): boolean {
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


export function normalizeTokenType(tokenType: string | null): string {
    if (tokenType === null || tokenType.length === 0) {
        return "0".repeat(64);
    }
    return tokenType.toLowerCase();
}


/**
 * 生データを正規化します。
 * @param raw 生データ
 * @returns 正規化された生データ
 */
export function normalizeRaw(raw: string | null): string {
    if (raw === null || raw === undefined || typeof raw !== 'string') {
        return '';
    }
    return raw.toLowerCase();
}


/**
 * オブジェクトを正規化します。
 * @param object オブジェクト
 * @returns 正規化されたオブジェクト
 */
export function normalizeObject(object: any | null): object {
    if (object === null || object === undefined || typeof object !== 'object') {
        return {};
    }
    return object;
}


/**
 * ブロックレジスタスパラメータを正規化します。
 * @param ledgerParameters ブロックレジスタスパラメータ
 * @returns 正規化されたブロックレジスタスパラメータ
 */
export function normalizeLedgerParameters(ledgerParameters: string | null): string {
    if (ledgerParameters === null || ledgerParameters === undefined || ledgerParameters.length === 0) {
        return '';
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

