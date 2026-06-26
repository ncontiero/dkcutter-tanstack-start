{% if dkcutter.deployHost == "cloudflare" -%}
import { cloudflare } from "@cloudflare/vite-plugin";
{% elif dkcutter.deployHost == "netlify" -%}
import netlify from "@netlify/vite-plugin-tanstack-start";
{% endif -%}
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
{%- if dkcutter.useServerComponents %}
import rsc from "@vitejs/plugin-rsc";
{%- endif %}
{%- if dkcutter.useNitro %}
import { nitro } from "nitro/vite";
{%- endif %}
import { defineConfig } from "vite";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
{%- if dkcutter.deployHost != "cloudflare" %}
{%- if dkcutter.useServerComponents %}
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      rsc: {
        enabled: true,
      },
    }),
    rsc(),
{%- if dkcutter.deployHost == "netlify" %}
    netlify(),
{%- elif dkcutter.useNitro %}
    nitro(),
{%- endif %}
    viteReact(),
  ],
{%- else %}
  plugins: [devtools(), tailwindcss(), tanstackStart(),{% if dkcutter.deployHost == "netlify" %} netlify(),{% elif dkcutter.useNitro %} nitro(),{% endif %} viteReact()],
{%- endif %}
{%- else %}
  plugins: [
    devtools(),
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
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
    viteReact(),
  ],
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
