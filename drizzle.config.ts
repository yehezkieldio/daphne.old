import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
    schema: "src/database/schema/*.ts",
    out: "drizzle",
    driver: "pg",
    breakpoints: true,
    dbCredentials: {
        connectionString: env.DATABASE_CONNECTING_STRING,
    },
} satisfies Config;
