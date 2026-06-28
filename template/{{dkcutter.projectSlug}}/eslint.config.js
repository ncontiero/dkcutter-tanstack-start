import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
{%- if dkcutter.useParaglideJs %}
  ignores: [
    "project.inlang/README.md",
    "src/paraglide/**",
    "src/routeTree.gen.ts",
{%- if dkcuttter.useCloudflare %}
    "worker-configuration.d.ts",
{%- endif %}
  ],
{%- else %}
  ignores: ["src/routeTree.gen.ts"{{ ', "worker-configuration.d.ts"'|safe if dkcutter.useCloudflare }}],
{%- endif %}
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
