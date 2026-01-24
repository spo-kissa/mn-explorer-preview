// Bun ネイティブの WebSocket サーバ

import GetStats from "./lib/db/GetStats";
import GetRecentBlocks from "./lib/db/GetRecentBlocks";
import GetRecentTransactions from "./lib/db/GetRecentTransactions";

interface RecentBlock {
    height: number;
    hash: string;
    timestamp: number;
    txsCount: number;
}

interface RecentTransaction {
    hash: string;
    timestamp: number;
    status: string;
    block_height: number;
    index_in_block: number;
}

interface Stats {
    latestBlockHeight: number;
    indexedBlocks: number;
    totalTransactions: number;
    totalContracts: number;
}

interface StatusMessage {
    type: "stats.snapshot";
    timestamp: number;
    stats: Stats;
    recentBlocks: RecentBlock[];
    recentTransactions: RecentTransaction[];
}

interface WSData {
    type: string;
    data: unknown;
}

const WS_PATH = "/api/v1/ws";

// 接続中クライアントを管理
const clients = new Set<ServerWebSocket<unknown>>();


// 最新の統計情報を取得
async function fetchLatestStatus(): Promise<StatusMessage> {
    const stats = await GetStats();
    const recentBlocks = await GetRecentBlocks(10);
    const recentTransactions = await GetRecentTransactions(10);

    return {
        type: "status.snapshot",
        timestamp: Date.now(),
        stats: stats,
        recentBlocks: recentBlocks,
        recentTransactions: recentTransactions,
    };
}


async function broadcastStatus() {
    if (clients.size === 0) return;

    const status = await fetchLatestStatus();
    
    //const payload = JSON.stringify(status);

    for (const ws of clients) {
        try {
            sendStatus(ws, status);
            //  ws.send(payload);
        } catch (e) {
            console.error("[WS] send error", e.message);
        }
    }
}

async function sendStatus(ws: ServerWebSocket<unknown>, status: StatusMessage | null = null) {
    try {
        if (!status) {
            status = await fetchLatestStatus();
        }
        
        const payload = JSON.stringify(status);

        ws.send(payload);

    } catch (e) {
        console.error("[WS] send status error", e.message);
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
            clients.add(ws);

            sendStatus(ws);
            // ws.send("Welcome to the WebSocket server!");

            fetchLatestStatus()
                .then((status) => {
                    sendStatus(ws, status);
                })
                .catch((e) => {
                    console.error("[WS] initial status error", e);
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
    broadcastStatus().catch((e) =>
        console.error("[WS] broadcast status error", e)
    );
}, 1000);


console.log(
    `[WS] Bun WebSocket server is listening on ${server.hostname}:${server.port}${WS_PATH}`,
);

process.on("SIGINT", () => {
    console.log("[WS] SIGINT signal received. Shutting down...");
    server.stop();
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("[WS] SIGTERM signal received. Shutting down...");
    server.stop();
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
