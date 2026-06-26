# DKCutter TanStack Start

[![Build Status](https://img.shields.io/github/actions/workflow/status/ncontiero/dkcutter-tanstack-start/ci.yml?branch=main)](https://github.com/ncontiero/dkcutter-tanstack-start/actions/workflows/ci.yml?query=branch%3Amain)
[![license mit](https://img.shields.io/badge/licence-MIT-56BEB8)](LICENSE)

Powered by [DKCutter](https://dkcutter.ncontiero.com/), DKCutter TanStack Start is a robust template for quickly scaffolding production-ready full-stack applications with [TanStack Start](https://tanstack.com/start).

- If you have problems with DKCutter TanStack Start, please open an [issue](https://github.com/ncontiero/dkcutter-tanstack-start/issues/new).

## Features

- ⚡️ **TanStack Start**: Modern full-stack React framework powered by TanStack Router.
- 🔐 **Authentication**: Out-of-the-box support for [Clerk](https://clerk.com/) or [Better Auth](https://www.better-auth.com/).
- 🗄️ **Database**: Optional [Prisma](https://www.prisma.io/) ORM integration.
- ⚙️ **Background Jobs**: Integrated with [Trigger.dev](https://trigger.dev/) for serverless background tasks.
- 🔄 **Data Fetching**: Optional [TanStack Query](https://tanstack.com/query/latest) configuration for powerful async state management.
- 🖼️ **Images**: High-performance, framework-agnostic image component via [Unpic](https://unpic.pics/).
- 🎨 **Styling**: Pre-configured with **Tailwind CSS** out-of-the-box, with optional support for [Shadcn UI](https://ui.shadcn.com/) components and the [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography) plugin.
- 🛠️ **Code Quality & Git Hooks**: Enforce standards with Husky, Lint Staged, Nano Staged, Commitlint, and optional type-aware ESLint.
- 🤖 **Dependency Automation**: Keep your project up-to-date automatically using Mend Renovate or GitHub Dependabot.
- 🚀 **Deployment & Runtime**: Pre-configured options for Cloudflare, Netlify, Vercel, or generic Nitro deployment, alongside optional Bun runtime support.

## Usage

To scaffold an application using [DKCutter](https://dkcutter.ncontiero.com/), run any of the following commands and answer the command prompt questions:

### npm

```bash
npx dkcutter@latest gh:ncontiero/dkcutter-tanstack-start
```

### yarn

```bash
yarn dlx dkcutter@latest gh:ncontiero/dkcutter-tanstack-start
```

### pnpm

```bash
pnpm dlx dkcutter@latest gh:ncontiero/dkcutter-tanstack-start
```

### bun

```bash
bunx dkcutter@latest gh:ncontiero/dkcutter-tanstack-start
```

You'll be prompted for some values. Provide them, and a tailored TanStack Start project will be created for you.

**Warning**: After generation, ensure you update 'author name' and other specific details to your own information.

Answer the prompts with your own desired [options][options-url]. For example:

```bash
✔ What is the project name? … My Awesome Project
✔ What is the project slug? … my-awesome-project
✔ What is the project description? … Behold My Awesome Project!
✔ What is the author name? … Nicolas Contiero <https://github.com/ncontiero>
✔ What is the project version? … 0.1.0
✔ Which Authentication Provider would you like to use? › None / Clerk / Better Auth
✔ Which Additional Tools would you like to use? › Husky, Lint Staged, Nano Staged, Commitlint, ESlint + Type Information, Prisma, Trigger.dev, Tanstack Query, Shadcn, Tailwind CSS Typography, Unpic
✔ Would you like to enable React Server Components (RSC)? (Experimental) … No / Yes
✔ Which Automated Dependency Updater do you want to use? › None / Mend Renovate / Github Dependabot
✔ Which Deployment Host would you like to use? › None / Cloudflare / Netlify / Nitro (agnostic) / Vercel
✔ Bun detected. Use it as the Server Runtime for My Awesome Project? … No / Yes
✔ Would you like to install the dependencies? … No / Yes
✔ Would you like to initialize a git repository and create an initial commit? … No / Yes

Next steps:
  cd my-awesome-project
  pnpm dev

✔ Project created!
```

Enter the project and take a look around:

```bash
cd my-awesome-project/
ls
```

Now take a look at your repo. Don't forget to carefully look at the generated `README.md`.

## Advanced Usage

If you want to bypass the interactive prompts and start faster, you can provide configuration via CLI flags. All options in `dkcutter.json` are available as flags:

| Flag                              | Description                                                                                                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--projectName <string>`          | The Project name.                                                                                                                                                                      |
| `--projectSlug <string>`          | The Project Slug.                                                                                                                                                                      |
| `--description <string>`          | The Project description.                                                                                                                                                               |
| `--authorName <string>`           | The author name.                                                                                                                                                                       |
| `--projectVersion <string>`       | The project version.                                                                                                                                                                   |
| `--authProvider <string>`         | Choose an authentication provider (`none`, `clerk`, `betterAuth`).                                                                                                                     |
| `--additionalTools <string>`      | Comma-separated list of tools (`husky`, `lintStaged`, `nanoStaged`, `commitlint`, `eslintTypeInfo`, `prisma`, `triggerDev`, `tanstackQuery`, `shadcn`, `tailwindTypography`, `unpic`). |
| `--useServerComponents [boolean]` | Indicates whether the project should use React Server Components (RSC) (Experimental in TanStack Start).                                                                               |
| `--automatedDepsUpdater <string>` | Choose Automated Dependency Updater (`none`, `renovate`, `dependabot`).                                                                                                                |
| `--deployHost <string>`           | Select the Deployment Host (`none`, `cloudflare`, `netlify`, `nitro`, `vercel`).                                                                                                       |
| `--useBunRuntime [boolean]`       | Use Bun as the Server Runtime (only when using `bun` as package manager).                                                                                                              |
| `--installDependencies [boolean]` | Indicates whether to automatically install dependencies after generation.                                                                                                              |
| `--initializeGit [boolean]`       | Indicates whether to initialize a git repository and make an initial commit.                                                                                                           |

[See here for more information about options][options-url].

### Examples

Generate a project using Prisma and Unpic:

```bash
pnpm dlx dkcutter gh:ncontiero/dkcutter-tanstack-start --additionalTools prisma,unpic
```

If you want to use all the default values with the exception of one or more, you can do it as follows:

```bash
pnpm dlx dkcutter gh:ncontiero/dkcutter-tanstack-start --authProvider clerk -y
```

This will use the default values, with the exception of the `--authProvider` option, skipping the interactive prompt (`-y`).

[options-url]: ./docs/project-generation-options.md
