# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## What this repo is

A [DKCutter](https://dkcutter.ncontiero.com/) template (cookiecutter-style) that scaffolds TanStack Start apps. Users run `npx dkcutter@latest gh:ncontiero/dkcutter-tanstack-start` and answer prompts. This repo is **not** an app itself — it is the template plus generation hooks and tests that generate many option combinations.

Package manager is **Bun** (`packageManager: bun@…`).

## Commands

```bash
bun install
bun run check              # lint + typecheck (what CI runs) — covers hooks/ and tests/ only
bun run lint:fix
bun run test               # vitest: generates every combination in tests/constants.ts and lints each
bun run test:typecheck     # also installs deps, builds (betterAuth only) and typechecks each generated project — slow
bun run test:strict-eslint # same as test but lint with --max-warnings 0
bun run generate           # dkcutter . — generate a project interactively from the local template
bun run generate -o /tmp/out --authProvider clerk --additionalTools prisma -y   # non-interactive
```

Run a subset of tests with vitest's name filter, e.g. `bunx vitest run -t "authprovider-clerk"` (test names are built from the combination: `key-value_key-value`, lowercased, commas → `_`). Generated test projects go to `.test/` and are removed after the run.

In the default `test` mode the generated projects have no `node_modules`: their `lint` resolves ESLint plugins/configs from the **root** `node_modules`. That's why the root `package.json` has devDependencies used only by the template's `eslint.config.js` (e.g. `@tanstack/eslint-plugin-query`, `@tailwindcss/typography`, `@inlang/paraglide-js`) — anything newly imported there must also be added to the root, pinned to the same version as in the template. `test:typecheck` runs `git init` in each project before install/build; without it, Tailwind's automatic source detection inside the git-ignored `.test/` makes builds take minutes.

Commits must follow Conventional Commits (commitlint runs on `commit-msg` and on PRs in CI).

## Architecture

Generation happens in three layers; changing or adding an option usually touches all of them:

1. **`dkcutter.json`** — prompt definitions (option names, choices, defaults, `disabled` conditions). Every key is also a CLI flag. Keys prefixed `_` are computed values (e.g. `_ciInstall`) available to templates. Documented for users in `README.md` and `docs/project-generation-options.md`.

2. **`template/{{dkcutter.projectSlug}}/`** — the generated project. Files are Nunjucks-rendered: use `{{ dkcutter.<key> }}` and `{% if dkcutter.<flag> %}` blocks. The template is a superset: `package.json` lists **all** possible deps/scripts and source files for all features exist; they are pruned afterward. ESLint/TS ignore `template/` at the root level (it isn't valid TS until rendered).

3. **`hooks/`** — TypeScript that runs during generation:
   - `preGenProject.ts` defines derived boolean context flags via `dkcutter.add(...)` (e.g. `usePrisma`, `useShadcn`, `useCloudflare`, `useNitro` — note `useNitro` is true for both `nitro` and `vercel`). These flags are what templates and `postGenProject.ts` consume.
   - `postGenProject.ts` runs inside the generated project: reads the `CTX` (itself templated from `{{ dkcutter.* }}` strings), then for each disabled feature pushes to `REMOVE_DEPS` / `REMOVE_DEV_DEPS` / `FILES_TO_REMOVE` and deletes/composes scripts in `SCRIPTS` (e.g. Prisma/Sentry/Paraglide/Trigger.dev wrap `build`, `dev`, `postinstall`). It also removes lockfile config for unused package managers, sets `packageManager`, handles Better Auth secret placeholders in env files, then optionally installs deps and initializes git.
   - `hooks/utils/` holds shared helpers (`updatePackageJson`, `setFlag`, `toBoolean`, etc.).

When adding a new tool/option: add the choice in `dkcutter.json`, a `use*` flag in `preGenProject.ts`, the flag in `CTX` + `ContextProps` (`hooks/utils/types.ts`), template files/deps/conditional blocks, pruning logic in `postGenProject.ts`, a combination in `tests/constants.ts` (`SUPPORTED_COMBINATIONS`), and docs (`README.md` flag table, `docs/project-generation-options.md`).

## Tests

`tests/generate.test.ts` runs `bun run generate` per combination with `--installDependencies false --initializeGit false -y`, asserts no unrendered `{{ dkcutter.* }}` remains in any file, and runs the generated project's `lint`. `UNSUPPORTED_COMBINATIONS` and `INVALID_SLUGS` must make generation exit with code 1. CI runs `check` plus tests on Ubuntu, Windows and macOS, so path handling in hooks must be cross-platform (`node:path`).
