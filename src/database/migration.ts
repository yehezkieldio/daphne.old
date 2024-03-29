import { env } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: env.DATABASE_CONNECTING_STRING,
});

const db = drizzle(pool);

const main = async () => {
    console.log("Migrating database...");

    await migrate(db, {
        migrationsFolder: "drizzle",
    });
    await pool.end();

    return;
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
