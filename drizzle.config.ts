import "dotenv/config";

import type { Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;