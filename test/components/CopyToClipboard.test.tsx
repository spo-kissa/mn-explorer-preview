import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CopyToClipboard from "@/components/elements/CopyToClipboard";

vi.mock("@/i18n", () => ({
    useI18n: () => ({
        locale: "en",
        message: {},
        t: (path: string) => `[${path}]`,
        setLocale: vi.fn(),
    }),
}));

describe("CopyToClipboard", () => {

    beforeEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
        });
    });

    afterEach(() => {
        Object.assign(navigator, {
            clipboard: {
                writeText: undefined,
            },
        });
    });

    const textToCopy = "0x123";

    test("クリックでコピーが実行される", async () => {
        render(<CopyToClipboard text={textToCopy} />);
        const button = screen.getByRole("button", { name: "[copy.tooltip]" });
        fireEvent.click(button);
        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
        })
    })
});
