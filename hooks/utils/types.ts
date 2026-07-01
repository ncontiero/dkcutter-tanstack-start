export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type AuthProvider = "none" | "clerk" | "betterAuth";
export type AutomatedDepsUpdater = "none" | "renovate" | "dependabot";
export type DeployHost = "none" | "cloudflare" | "netlify" | "nitro" | "vercel";

export interface ContextProps {
  default: boolean;
  projectSlug: string;
  pkgManager: PackageManager;
  authProvider: AuthProvider;
  useHusky: boolean;
  useLintStaged: boolean;
  useNanoStaged: boolean;
  useCommitlint: boolean;
  useReactCompiler: boolean;
  useReactHookForm: boolean;
  useParaglideJs: boolean;
  useSentry: boolean;
  useEslintWithType: boolean;
  usePrisma: boolean;
  useTriggerDev: boolean;
  useTanstackQuery: boolean;
  useShadcn: boolean;
  useTailwindTypography: boolean;
  useUnpic: boolean;
  useServerComponents: boolean;
  useDockerCompose: boolean;
  automatedDepsUpdater: AutomatedDepsUpdater;
  deployHost: DeployHost;
  useCloudflare: boolean;
  useNetlify: boolean;
  useNitro: boolean;
  installDependencies: boolean;
  initializeGit: boolean;
}

export interface SetFlagProps {
  filePath: string;
  flag: string;
  length?: number;
  value?: string;
  formatted?: string;
}
