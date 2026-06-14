export const PATTERN = /\{\{(\s?dkcutter)\.(.*?)\}\}/;

export const SUPPORTED_COMBINATIONS = [
  { authProvider: "clerk" },
  { authProvider: "betterAuth" },
  { additionalTools: "husky" },
  { additionalTools: "lintStaged" },
  { additionalTools: "nanoStaged" },
  { additionalTools: "commitlint" },
  { additionalTools: "prisma" },
  { additionalTools: "triggerDev" },
  { additionalTools: "tanstackQuery" },
  { additionalTools: "unpic" },
  { automatedDepsUpdater: "renovate" },
  { automatedDepsUpdater: "dependabot" },
  { deployHost: "cloudflare" },
  { deployHost: "netlify" },
  { deployHost: "nitro" },
  { deployHost: "vercel" },
  { deployHost: "cloudflare", useBunRuntime: true },
  { deployHost: "netlify", useBunRuntime: true },
  { deployHost: "nitro", useBunRuntime: true },
  { deployHost: "vercel", useBunRuntime: true },
  { authProvider: "clerk", additionalTools: "prisma" },
  { authProvider: "clerk", additionalTools: "tanstackQuery" },
  { authProvider: "clerk", additionalTools: "prisma,tanstackQuery" },
  { authProvider: "betterAuth", additionalTools: "prisma" },
  { authProvider: "betterAuth", additionalTools: "tanstackQuery" },
  { authProvider: "betterAuth", additionalTools: "prisma,tanstackQuery" },
  {
    authProvider: "clerk",
    additionalTools:
      "husky,lintStaged,nanoStaged,commitlint,prisma,triggerDev,tanstackQuery,unpic",
  },
  {
    authProvider: "betterAuth",
    additionalTools:
      "husky,lintStaged,nanoStaged,commitlint,prisma,triggerDev,tanstackQuery,unpic",
  },
];

export const UNSUPPORTED_COMBINATIONS = [
  { authProvider: "non" },
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
