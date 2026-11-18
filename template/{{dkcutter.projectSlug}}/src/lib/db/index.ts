import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env";
import * as schema from "./schema";

const createDb = () => {
  const pool = new Pool({ connectionString: env.DATABASE_URL });
  // An idle connection can drop (e.g. a database restart): the pool replaces it, so only log
  // the error, which would otherwise be an uncaught exception.
  pool.on("error", (error) => {
    console.error("Unexpected database pool error:", error);
  });

  return drizzle({
    client: pool,
    schema,
    // Write columns in camelCase in `schema.ts`, store them in snake_case.
    casing: "snake_case",
    logger: env.NODE_ENV === "development",
  });
};

// Reuse the connection pool across hot reloads in development.
const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof createDb> | undefined;
};

export const db = globalForDb.db ?? createDb();

if (env.NODE_ENV !== "production") globalForDb.db = db;
