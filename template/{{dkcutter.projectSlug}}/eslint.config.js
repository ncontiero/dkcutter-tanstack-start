import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  ignores: ["./src/routeTree.gen.ts"{{ ', "worker-configuration.d.ts"'|safe if dkcutter.deployHost == "cloudflare" }}],
{%- if dkcutter.useEslintWithType %}
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
{%- endif %}
  tailwindcss: {
    cssGlobalPath: "./src/styles.css",
  },
{%- if dkcutter.useTanstackQuery %}
  tanstackQuery: true,
{%- endif %}
  javascript: {
    overrides: {
      "node/no-unsupported-features/node-builtins": [
        "error",
        { allowExperimental: true },
      ],
    },
  },
});
