import { env } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: env.DATABASE_CONNECTING_STRING,
});

export const db = drizzle(pool);
