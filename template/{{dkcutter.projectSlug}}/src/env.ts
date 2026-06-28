import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
{%- if dkcutter.usePrisma %}
    DATABASE_URL: z.url(),
{%- endif %}
{%- if dkcutter.useSentry %}
    // Sentry
    SENTRY_AUTH_TOKEN: z.string().min(1),
{%- endif %}
{%- if dkcutter.authProvider == "clerk" %}
    // Clerk
    CLERK_SECRET_KEY: z.string().min(1),
{%- elif dkcutter.authProvider == "betterAuth" %}
    // Better Auth
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.url(),
{%- endif %}
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `VITE_`.
   */
  client: {
    // VITE_CLIENTVAR: z.string(),
{%- if dkcutter.authProvider == "clerk" %}
    // Clerk
    VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1),
{%- endif %}
{%- if dkcutter.useSentry %}
    // Sentry
    VITE_SENTRY_DSN: z.string().min(1),
    VITE_SENTRY_ORG: z.string().min(1),
    VITE_SENTRY_PROJECT: z.string().min(1),
{%- endif %}
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    ...process.env,
    ...import.meta.env,
  },

  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
