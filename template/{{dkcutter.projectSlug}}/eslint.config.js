import { ncontiero } from "@ncontiero/eslint-config";

export default ncontiero({
  ignores: ["./src/routeTree.gen.ts"],
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
});
