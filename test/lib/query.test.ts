import { describe, expect, test } from "vitest";
import { isHash, isHeight } from "@/lib/query";


describe("isHash", () => {

    test("64桁の16進数はハッシュとして認識される", () => {
        expect(isHash("a".repeat(64))).toBe(true);
    });

    test("0x付き66桁の16進数も認識される", () => {
        expect(isHash("0x" + "a".repeat(64))).toBe(true);
    });

    test("64桁未満はfalse", () => {
        expect(isHash("abc")).toBe(false);
    })

});


describe("isHeight", () => {

    test("数値はtrue", () => {
        expect(isHeight(1234567890)).toBe(true);
    });

    test("文字列はtrue", () => {
        expect(isHeight("1234567890")).toBe(true);
    });
});
