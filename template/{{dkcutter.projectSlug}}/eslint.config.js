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
  javascript: {
    overrides: {
      "node/no-unsupported-features/node-builtins": [
        "error",
        { allowExperimental: true },
      ],
    },
  },
  react: {
    overrides: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          // Necessary for TanStack Start / Router
          // https://github.com/ArnaudBarre/eslint-plugin-react-refresh/issues/102
          extraHOCs: [
            "createFileRoute",
            "createLazyFileRoute",
            "createRootRoute",
            "createRootRouteWithContext",
            "createLink",
            "createRoute",
            "createLazyRoute",
          ],
        },
      ],
    },
  },
});
