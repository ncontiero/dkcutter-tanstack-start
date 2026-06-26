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
  { deployHost: "nitro", useBunRuntime: true },
  { deployHost: "vercel", useBunRuntime: true },
  { authProvider: "clerk", additionalTools: "prisma,tanstackQuery" },
  { authProvider: "betterAuth", additionalTools: "prisma,tanstackQuery" },
  {
    authProvider: "clerk",
    additionalTools:
      "husky,lintStaged,nanoStaged,commitlint,prisma,triggerDev,tanstackQuery,shadcn,tailwindTypography,unpic",
  },
  {
    authProvider: "betterAuth",
    additionalTools:
      "husky,lintStaged,nanoStaged,commitlint,prisma,triggerDev,tanstackQuery,shadcn,tailwindTypography,unpic",
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
