{% if dkcutter.usePrisma -%}
import { prismaAdapter } from "@better-auth/prisma-adapter";
{% endif -%}
import { betterAuth } from "better-auth/minimal";
import { tanstackStartCookies } from "better-auth/tanstack-start";
{%- if dkcutter.usePrisma %}
import { prisma } from "../prisma";
{%- endif %}

export const auth = betterAuth({
{%- if dkcutter.usePrisma %}
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  advanced: {
    database: {
      generateId: false,
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
