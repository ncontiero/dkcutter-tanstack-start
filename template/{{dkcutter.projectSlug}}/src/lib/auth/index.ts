{% if dkcutter.useDrizzle -%}
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
{% elif dkcutter.usePrisma -%}
import { prismaAdapter } from "@better-auth/prisma-adapter";
{% endif -%}
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";
{%- if dkcutter.useDrizzle %}
import { db } from "../db";
{%- elif dkcutter.usePrisma %}
import { prisma } from "../prisma";
{%- endif %}

export const auth = betterAuth({
{%- if dkcutter.useDatabase %}
{%- if dkcutter.useDrizzle %}
  database: drizzleAdapter(db, { provider: "pg" }),
{%- else %}
  database: prismaAdapter(prisma, { provider: "postgresql" }),
{%- endif %}
  advanced: {
    database: {
{%- if dkcutter.useDrizzle %}
      // Matches the `uuid` id columns: Postgres generates the ids, and ids Better Auth derives
      // (single-use records) are formatted as UUIDs. `npx auth generate` also keeps `uuid` columns.
      generateId: "uuid",
{%- else %}
      // The schema defaults (`@default(uuid())`) generate the ids instead of Better Auth.
      generateId: false,
{%- endif %}
    },
  },
{%- endif %}
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [tanstackStartCookies()],
});
