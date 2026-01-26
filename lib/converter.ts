
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
        return hash;
    }
    return '0x' + hash;
}

export enum TokenTypes {
    UNKNOWN = 'UNKNOWN',
    NIGHT = '0000000000000000000000000000000000000000000000000000000000000000',
}

export function tokenTypeToName(tokenType: string): string {

    if (tokenType === TokenTypes.NIGHT) {
        return "NIGHT";
    }

    return "UNKNOWN";
}
