export const PATTERN = /\{\{(\s?dkcutter)\.(.*?)\}\}/;

export const SUPPORTED_COMBINATIONS = [
  { authProvider: "clerk" },
  { authProvider: "betterAuth" },
  { additionalTools: "husky" },
  { additionalTools: "lintStaged" },
  { additionalTools: "nanoStaged" },
  { additionalTools: "commitlint" },
  { additionalTools: "reactCompiler" },
  { additionalTools: "paraglideJs" },
  { additionalTools: "sentry" },
  { orm: "prisma" },
  { orm: "drizzle" },
  { orm: "drizzle", useDockerCompose: true },
  { authProvider: "betterAuth", orm: "drizzle" },
  { deployHost: "cloudflare", orm: "drizzle" },
  { additionalTools: "triggerDev" },
  { additionalTools: "tanstackQuery" },
  { additionalTools: "shadcn" },
  { additionalTools: "tailwindTypography" },
  { additionalTools: "unpic" },
  { useServerComponents: true },
  { automatedDepsUpdater: "renovate" },
  { automatedDepsUpdater: "dependabot" },
  { deployHost: "cloudflare" },
  { deployHost: "netlify" },
  { deployHost: "nitro" },
  { deployHost: "vercel" },
  { deployHost: "cloudflare", useServerComponents: true },
  { deployHost: "netlify", useServerComponents: true },
  { deployHost: "nitro", useServerComponents: true },
  { deployHost: "cloudflare", additionalTools: "reactCompiler" },
  { deployHost: "netlify", additionalTools: "reactCompiler" },
  { deployHost: "nitro", additionalTools: "reactCompiler" },
  { authProvider: "clerk", additionalTools: "sentry,paraglideJs" },
  { deployHost: "cloudflare", additionalTools: "paraglideJs" },
  { deployHost: "cloudflare", additionalTools: "sentry" },
  { deployHost: "cloudflare", additionalTools: "sentry,paraglideJs" },
  { deployHost: "vercel", additionalTools: "sentry,paraglideJs" },
  { deployHost: "netlify", additionalTools: "sentry" },
  { authProvider: "betterAuth", additionalTools: "reactHookForm" },
  { authProvider: "betterAuth", additionalTools: "shadcn" },
  { authProvider: "betterAuth", additionalTools: "reactHookForm,paraglideJs" },
  {
    authProvider: "betterAuth",
    orm: "prisma",
    additionalTools: "shadcn,reactHookForm,paraglideJs",
  },
  { authProvider: "clerk", additionalTools: "shadcn" },
  {
    deployHost: "cloudflare",
    additionalTools: "reactCompiler",
    useServerComponents: true,
  },
  {
    deployHost: "netlify",
    additionalTools: "reactCompiler",
    useServerComponents: true,
  },
  {
    deployHost: "nitro",
    additionalTools: "reactCompiler",
    useServerComponents: true,
  },
  { deployHost: "nitro", useBunRuntime: true },
  { deployHost: "vercel", useBunRuntime: true },
  { authProvider: "clerk", orm: "prisma", additionalTools: "tanstackQuery" },
  {
    authProvider: "betterAuth",
    orm: "drizzle",
    additionalTools: "tanstackQuery",
  },
  {
    authProvider: "clerk",
    orm: "prisma",
    additionalTools:
      "husky,lintStaged,nanoStaged,commitlint,triggerDev,tanstackQuery,shadcn,tailwindTypography,unpic",
  },
  {
    authProvider: "betterAuth",
    orm: "drizzle",
    additionalTools:
      "husky,lintStaged,nanoStaged,commitlint,reactCompiler,triggerDev,tanstackQuery,shadcn,tailwindTypography,unpic",
    useServerComponents: true,
  },
];

export const UNSUPPORTED_COMBINATIONS = [
  { authProvider: "non" },
  { orm: "xpto" },
  { automatedDepsUpdater: "xpto" },
];

export const INVALID_SLUGS = [
  "",
  " ",
  "Test",
  "teSt",
  "tes1@",
  "t!es",
  "test test",
];

export const EXCLUDED_DIRS = ["node_modules"];
