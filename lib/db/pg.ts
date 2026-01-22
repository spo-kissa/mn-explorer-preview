import { Pool } from "pg";

const globalPg = new golobal as unknown as { pool?: Pool };

export const pg =
    globalPg.pool ?? new Pool({
        connectionString: process.env.DATABASE_URL,
    });

if (process.env.NODE_ENV !== "production") {
    globalPg.pool = pg;
}
