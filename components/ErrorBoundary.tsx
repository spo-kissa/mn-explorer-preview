"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // ブラウザ拡張機能由来のエラーを抑制
        const handleError = (event: ErrorEvent) => {
            if (
                event.message?.includes("message channel closed") ||
                event.message?.includes("asynchronous response")
            ) {
                event.preventDefault();
                return false;
            }
        };

        // Promise rejection のエラーも処理
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            if (
                event.reason?.message?.includes("message channel closed") ||
                event.reason?.message?.includes("asynchronous response")
            ) {
                event.preventDefault();
                return false;
            }
        };

        window.addEventListener("error", handleError);
        window.addEventListener("unhandledrejection", handleUnhandledRejection);

        return () => {
            window.removeEventListener("error", handleError);
            window.removeEventListener("unhandledrejection", handleUnhandledRejection);
        };
    }, []);

    return <>{children}</>;
}
