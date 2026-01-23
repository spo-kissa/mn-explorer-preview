// Bun ネイティブの WebSocket サーバ

import GetStats from "./lib/db/GetStats";

type Stats = {
    latestBlockHeight: number;
    indexedBlocks: number;
    totalTransactions: number;
    totalContracts: number;
};

type StatsMessage = {
    type: "stats.snapshot";
    timestamp: number;
    stats: Stats;
};

type WSData = string | ArrayBuffer | Uint8Array;

const WS_PATH = "/api/v1/ws";

// 接続中クライアントを管理
const clients = new Set<ServerWebSocket<unknown>>();

// 最新の統計情報を取得
async function fetchLatestStats(): Promise<Stats> {
    const { latestBlockHeight, indexedBlocks, totalTransactions, totalContracts } = await GetStats();
    return {
        latestBlockHeight: Number(latestBlockHeight),
        indexedBlocks: Number(indexedBlocks),
        totalTransactions: Number(totalTransactions),
        totalContracts: Number(totalContracts),
    };
}


async function broadcastStats() {
    if (clients.size === 0) return;

    const stats = await fetchLatestStats();

    const msg: StatsMessage = {
        type: "stats.snapshot",
        timestamp: Date.now(),
        stats,
    };

    const payload = JSON.stringify(msg);

    for (const ws of clients) {
        try {
            ws.send(payload);
        } catch (e) {
            console.error("[WS] send error", e);
        }
    }
}


const server = Bun.serve({
    port: Number(process.env.WS_PORT) || 4000,

    fetch(req, server) {
        const url = new URL(req.url);

        if (url.pathname === WS_PATH) {
            const ok = server.upgrade(req, {

            });

            if (!ok) {
                // upgrade に失敗した場合
                return new Response("WebSocket upgrade failed", { status: 400 });
            }
            // upgrade に成功した場合、以降は websocket ハンドラに制御が移るので、
            // ここでは何も返さない
            return;
        }

        // 通常の HTTP リクエストには適当なレスポンスを返す
        return new Response("Bun WebSocket server is running", { status: 200 });
    },

    websocket: {
        // クライアント接続時
        open(ws) {
            console.log("[WS] Client connected");
            // ws.send("Welcome to the WebSocket server!");
            clients.add(ws);

            fetchLatestStats()
                .then((stats) => {
                    const msg: StatsMessage = {
                        type: "stats.snapshot",
                        timestamp: Date.now(),
                        stats,
                    };
                    const payload = JSON.stringify(msg);
                    ws.send(payload);
                })
                .catch((e) => {
                    console.error("[WS] initial stats error", e);
                });
        },

        // メッセージ受信時
        message(ws, message: WSData) {
            let text: string;

            if (typeof message === "string") {
                text = message;
            } else if (message instanceof ArrayBuffer) {
                text = new TextDecoder().decode(message);
            } else {
                text = new TextDecoder().decode(message);
            }

            console.log("[WS] Received: ", text);

           // ws.send(`echo: ${text}`);
        },

        close(ws, code, reason) {
            console.log("[WS] Client disconnected", code, reason);
        },

        error(ws, error) {
            console.error("[WS] Error: ", error);
        }
    },
});

setInterval(() => {
    broadcastStats().catch((e) =>
        console.error("[WS] broadcast stats error", e)
    );
}, 1000);


console.log(
    `[WS] Bun WebSocket server is listening on ${server.hostname}:${server.port}${WS_PATH}`,
);

process.on("SIGINT", () => {
    console.log("[WS] SIGINT signal received. Shutting down...");
    server.close();
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("[WS] SIGTERM signal received. Shutting down...");
    server.close();
    process.exit(0);
});

process.on("uncaughtException", (error) => {
    console.error("[WS] Uncaught exception: ", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("[WS] Unhandled rejection: ", reason);
    process.exit(1);
});
