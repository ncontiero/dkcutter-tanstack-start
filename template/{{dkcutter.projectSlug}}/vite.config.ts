{% if dkcutter.deployHost == "cloudflare" -%}
import { cloudflare } from "@cloudflare/vite-plugin";
{% endif -%}
{% if dkcutter.useParaglideJs -%}
import { paraglideVitePlugin } from "@inlang/paraglide-js";
{% endif -%}
{% if dkcutter.useSentry -%}
import { sentryTanstackStart } from "@sentry/tanstackstart-react/vite";
{% endif -%}
{% if dkcutter.deployHost == "netlify" -%}
import netlify from "@netlify/vite-plugin-tanstack-start";
{% endif -%}
{% if dkcutter.useReactCompiler -%}
import babel from "@rolldown/plugin-babel";
{% endif -%}
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
{%- if dkcutter.useReactCompiler %}
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
{%- else %}
import viteReact from "@vitejs/plugin-react";
{%- endif %}
{%- if dkcutter.useServerComponents %}
import rsc from "@vitejs/plugin-rsc";
{%- endif %}
{%- if dkcutter.useNitro %}
import { nitro } from "nitro/vite";
{%- endif %}
import { defineConfig } from "vite";
{%- if dkcutter.useSentry %}
import { env } from "./src/env";
{%- endif %}

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
{%- if dkcutter.useReactCompiler or dkcutter.useCloudflare or dkcutter.useServerComponents or dkcutter.useParaglideJs or dkcutter.useSentry %}
  plugins: [
    devtools(),
{%- if dkcutter.useParaglideJs %}
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            // Add your locales here
          ],
        },
      ],
    }),
{%- endif %}
    tailwindcss(),
{%- if dkcutter.useCloudflare %}
    cloudflare({ viteEnvironment: { name: "ssr" } }),
{%- endif %}
{%- if dkcutter.useServerComponents %}
    tanstackStart({
      rsc: {
        enabled: true,
      },
    }),
    rsc(),
{%- else %}
    tanstackStart(),
{%- endif %}
{%- if dkcutter.useNetlify %}
    netlify(),
{%- elif dkcutter.useNitro %}
    nitro(),
{%- endif %}
    viteReact(),
{%- if dkcutter.useReactCompiler %}
    babel({ presets: [reactCompilerPreset()] }),
{%- endif %}
{%- if dkcutter.useSentry %}
    sentryTanstackStart({
      org: env.VITE_SENTRY_ORG,
      project: env.VITE_SENTRY_PROJECT,
      authToken: env.SENTRY_AUTH_TOKEN,
      tunnelRoute: { allowedDsns: [env.VITE_SENTRY_DSN] },
    }),
{%- endif %}
  ],
{%- else %}
  plugins: [devtools(), tailwindcss(), tanstackStart(), {% if dkcutter.useNetlify %}netlify(), {% elif dkcutter.useNitro %}nitro(), {% endif %}viteReact()],
{%- endif %}
{%- if dkcutter.useNitro and dkcutter.useBunRuntime %}
  nitro: {
{%- if dkcutter.deployHost == "vercel" %}
    vercel: {
      functions: {
        runtime: "bun1.x",
      },
    },
{%- else %}
    preset: "bun",
{%- endif %}
  },
{%- endif %}
});

export default config;
