# Project Generation Options

This page describes all the template options that will be prompted by the [DKCutter CLI](https://github.com/ncontiero/dkcutter) prior to generating your project.

- **Project name**: Your project's human-readable name, capitals and spaces allowed.

- **Project slug**: Your project's slug without spaces. Used to name your repo and in other places.

- **Project description**: Describes your project and gets used in places like README.md and such.

- **Author name**: This is you! The value goes into places like LICENSE and such.

- **Project version**: The version of the project at its inception.

- **Authentication Provider**: Indicates whether the project should be configured using the following authentication providers:
  - None
  - [Clerk](https://clerk.com/): Hosted user accounts with prebuilt sign-in UI and social providers.
  - [Better Auth](https://www.better-auth.com/): Self-hosted user accounts and sessions.

- **Additional Tools**: Select additional tools to use:
  - [Husky](https://typicode.github.io/husky/): Modern native git hooks made easy.
  - [Lint Staged](https://github.com/lint-staged/lint-staged): Run linters against staged git files.
  - [Nano Staged](https://github.com/usmanyunusov/nano-staged): Tiny tool to run commands for modified, staged, and committed files.
  - [Commitlint](https://commitlint.js.org/): Lint commit messages.
  - [React Compiler](https://react.dev/learn/react-compiler): Automatically optimize React component renders.
  - [React Hook Form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.
  - [ESLint + Type Information](https://typescript-eslint.io/getting-started/typed-linting): Enable ESLint rules that require type information.
  - [Prisma](https://www.prisma.io/): Next-generation ORM for Node.js & TypeScript.
  - [Trigger.dev](https://trigger.dev/): The open source background jobs platform.
  - [Tanstack Query](https://tanstack.com/query/latest): Powerful asynchronous state management for TS/JS.
  - [Shadcn](https://ui.shadcn.com/): Copy-paste accessible UI components (Tailwind + Radix primitives).
  - [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography): A plugin that provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML.
  - [Unpic](https://unpic.pics): High-performance, framework-agnostic image component.

- **React Server Components**: Indicates whether the project should enable React Server Components (RSC) functionality (Experimental in TanStack Start). [See more](https://tanstack.com/start/latest/docs/framework/react/guide/server-components).

- **Automated Deps Updater**: Indicates whether the project should be configured using the following automated deps updater:
  - None
  - [Mend Renovate](https://docs.renovatebot.com/)
  - [Github Dependabot](https://docs.github.com/code-security/dependabot/working-with-dependabot/dependabot-options-reference)

- **Deployment Host**: Indicates the hosting provider the application will be configured for:
  - None
  - [Cloudflare](https://workers.cloudflare.com/): Deploy to Cloudflare Workers (edge runtime, KV/D1/R2 bindings).
  - [Netlify](https://www.netlify.com/): Deploy to Netlify (Functions and Edge Functions).
  - [Nitro (agnostic)](https://nitro.build): Generic Nitro adapter (deploy to any Node-compatible host).
  - [Vercel](https://vercel.com/): Deploy to Vercel (Serverless Functions and Edge Middleware).

- **Use Bun Runtime**: Indicates whether the project should use [Bun](https://bun.sh/) as the server runtime (only prompted if Bun is the chosen package manager).

- **Install Dependencies**: Indicates whether the dependencies should be automatically installed right after project generation.

- **Initialize Git**: Indicates whether a Git repository should be initialized with an initial commit.
