import type {
  AuthProvider,
  AutomatedDepsUpdater,
  ContextProps,
  DeployHost,
  PackageManager,
} from "./utils/types";
import path from "node:path";
import { getPackageInfo, logger, remove } from "dkcutter/utils";
import { toBoolean } from "./utils/coerce";
import { appendToGitignore } from "./utils/files";
import { getPkgManagerVersion } from "./utils/getPkgManagerVersion";
import { setFlag } from "./utils/setFlag";
import { updatePackageJson } from "./utils/updatePackageJson";

// const TEMPLATE_REPO = "ncontiero/dkcutter-tanstack-start";
const CTX: ContextProps = {
  projectSlug: "{{ dkcutter.projectSlug }}",
  pkgManager: "{{ dkcutter.pkgManager }}" as PackageManager,
  authProvider: "{{ dkcutter.authProvider }}" as AuthProvider,
  useHusky: toBoolean("{{ dkcutter.useHusky }}"),
  useLintStaged: toBoolean("{{ dkcutter.useLintStaged }}"),
  useNanoStaged: toBoolean("{{ dkcutter.useNanoStaged }}"),
  useCommitlint: toBoolean("{{ dkcutter.useCommitlint }}"),
  useEslintWithType: toBoolean("{{ dkcutter.useEslintWithType }}"),
  usePrisma: toBoolean("{{ dkcutter.usePrisma }}"),
  useTriggerDev: toBoolean("{{ dkcutter.useTriggerDev }}"),
  useTanstackQuery: toBoolean("{{ dkcutter.useTanstackQuery }}"),
  useUnpic: toBoolean("{{ dkcutter.useUnpic }}"),
  useTailwindTypography: toBoolean("{{ dkcutter.useTailwindTypography }}"),
  automatedDepsUpdater:
    "{{ dkcutter.automatedDepsUpdater }}" as AutomatedDepsUpdater,
  deployHost: "{{ dkcutter.deployHost }}" as DeployHost,
  // useNitro = deployHost in ["nitro", "vercel"]
  useNitro: toBoolean("{{ dkcutter.useNitro }}"),
};

async function setBetterAuthSecretKey(filePath: string) {
  return setFlag({ filePath, flag: "!!!SET BETTER_AUTH_SECRET!!!" });
}

async function setFlagsInEnvs() {
  const envPath = path.join(".env.local");
  const exampleEnvPath = path.join(".env.example");

  await setBetterAuthSecretKey(envPath);
  await setBetterAuthSecretKey(exampleEnvPath);
}

async function main() {
  const projectDir = path.resolve(".");
  const srcFolder = path.join(projectDir, "src");
  const routesFolder = path.join(srcFolder, "routes");
  const libFolder = path.join(srcFolder, "lib");

  const { packageJson } = await getPackageInfo(projectDir);

  const REMOVE_DEPS: string[] = [];
  const REMOVE_DEV_DEPS: string[] = [];
  const SCRIPTS = packageJson.scripts || {};
  const FILES_TO_REMOVE: string[] = [];

  await setFlagsInEnvs();

  const gitignorePath = path.join(projectDir, ".gitignore");
  await appendToGitignore(
    gitignorePath,
    "\n# local env files\n.env\n.env.*\n!.env.example\n",
  );

  const pkgVersion = await getPkgManagerVersion(CTX.pkgManager);
  if (pkgVersion) {
    await updatePackageJson({
      projectDir,
      modifyKey: { packageManager: pkgVersion },
    });
  } else {
    await updatePackageJson({ projectDir, keys: ["packageManager"] });
  }

  const npmrcFiles = ".npmrc";
  const yarnFiles = ".yarnrc.yml";
  const pnpmFiles = "pnpm-workspace.yaml";
  switch (CTX.pkgManager) {
    case "npm":
      FILES_TO_REMOVE.push(yarnFiles, pnpmFiles);
      break;
    case "bun":
      FILES_TO_REMOVE.push(npmrcFiles, yarnFiles, pnpmFiles);
      break;
    case "yarn":
      FILES_TO_REMOVE.push(npmrcFiles, pnpmFiles);
      break;
    case "pnpm":
      FILES_TO_REMOVE.push(npmrcFiles, yarnFiles);
      break;
  }

  const removeClerk = () => {
    REMOVE_DEPS.push("@clerk/tanstack-react-start");
    FILES_TO_REMOVE.push(path.join(srcFolder, "start.ts"));
  };
  const removeBetterAuth = () => {
    REMOVE_DEPS.push("@better-auth/prisma-adapter", "better-auth");
    FILES_TO_REMOVE.push(
      path.join(libFolder, "auth"),
      path.join(routesFolder, "api"),
    );
  };

  if (CTX.authProvider === "clerk") {
    removeBetterAuth();
  } else if (CTX.authProvider === "betterAuth") {
    removeClerk();
  } else {
    removeBetterAuth();
    removeClerk();
  }

  if (!CTX.useHusky && !CTX.useLintStaged && !CTX.useNanoStaged) {
    REMOVE_DEV_DEPS.push("husky");
    FILES_TO_REMOVE.push(path.join(projectDir, ".husky"));
    delete SCRIPTS.prepare;
  } else if (CTX.useLintStaged || CTX.useNanoStaged) {
    logger.warn(
      "Husky is required for lint-staged or nano-staged. It will be installed.",
    );
  }

  const removeLintStaged = () => {
    REMOVE_DEV_DEPS.push("lint-staged");
  };
  if (!CTX.useLintStaged) {
    removeLintStaged();
    await updatePackageJson({ projectDir, keys: ["lint-staged"] });
  }

  if (!CTX.useNanoStaged) {
    REMOVE_DEV_DEPS.push("nano-staged");
  }

  if (CTX.useLintStaged && CTX.useNanoStaged) {
    removeLintStaged();
    logger.warn(
      "You have selected both lint-staged and nano-staged. nano-staged will be used for the pre-commit script.",
    );
  }
  if (!CTX.useLintStaged && !CTX.useNanoStaged) {
    delete SCRIPTS["pre-commit"];
    FILES_TO_REMOVE.push(path.join(projectDir, ".husky", "pre-commit"));
  }

  if (!CTX.useCommitlint) {
    REMOVE_DEV_DEPS.push("@commitlint/cli", "@commitlint/config-conventional");
    FILES_TO_REMOVE.push(
      path.join(projectDir, ".commitlintrc.json"),
      path.join(projectDir, ".husky", "commit-msg"),
    );
    delete SCRIPTS["commit-msg"];
  }

  if (CTX.usePrisma) {
    const dbGenerate = `${CTX.pkgManager} run db:generate`;
    SCRIPTS.build = `${dbGenerate} && ${SCRIPTS.build}`;
    SCRIPTS.postinstall = `${SCRIPTS.postinstall} && ${dbGenerate}`;
  } else {
    REMOVE_DEPS.push(
      "@better-auth/prisma-adapter",
      "@prisma/adapter-pg",
      "@prisma/client",
    );
    REMOVE_DEV_DEPS.push("dotenv-cli", "prisma");
    FILES_TO_REMOVE.push(
      path.join(projectDir, "prisma"),
      path.join(projectDir, "prisma.config.ts"),
      path.join(libFolder, "prisma.ts"),
    );
    delete SCRIPTS["db:generate"];
    delete SCRIPTS["db:push"];
    delete SCRIPTS["db:migrate"];
    delete SCRIPTS["db:studio"];
    delete SCRIPTS["db:seed"];
  }

  if (CTX.useTriggerDev) {
    const newDevScript = `concurrently --kill-others --names "tanstack,trigger" --prefix-colors "red,green" "${SCRIPTS.dev}" "${CTX.pkgManager} run trigger:dev"`;
    SCRIPTS.dev = newDevScript;
  } else {
    REMOVE_DEPS.push("@trigger.dev/sdk");
    REMOVE_DEV_DEPS.push("@trigger.dev/build", "trigger.dev", "concurrently");
    FILES_TO_REMOVE.push(
      path.join(projectDir, "trigger.config.ts"),
      path.join(srcFolder, "trigger"),
    );
    delete SCRIPTS["trigger:dev"];
    delete SCRIPTS["trigger:deploy"];
  }

  if (!CTX.useTanstackQuery) {
    REMOVE_DEPS.push(
      "@tanstack/react-query",
      "@tanstack/react-router-ssr-query",
    );
    REMOVE_DEV_DEPS.push(
      "@tanstack/eslint-plugin-query",
      "@tanstack/react-query-devtools",
    );
  }

  if (!CTX.useTailwindTypography) {
    REMOVE_DEPS.push("@tailwindcss/typography");
  }

  if (!CTX.useUnpic) {
    REMOVE_DEPS.push("@unpic/react");
  }

  if (!CTX.usePrisma && CTX.authProvider !== "betterAuth") {
    FILES_TO_REMOVE.push(libFolder);
  }

  const githubFolder = path.join(projectDir, ".github");
  const removeDependabot = () => {
    FILES_TO_REMOVE.push(path.join(githubFolder, "dependabot.yml"));
  };
  const removeRenovate = () => {
    FILES_TO_REMOVE.push(path.join(githubFolder, "renovate.json"));
  };

  if (CTX.automatedDepsUpdater === "renovate") {
    removeDependabot();
  } else if (CTX.automatedDepsUpdater === "dependabot") {
    removeRenovate();
  } else {
    removeDependabot();
    removeRenovate();
  }

  const removeCloudflare = () => {
    REMOVE_DEV_DEPS.push("@cloudflare/vite-plugin", "wrangler");
    FILES_TO_REMOVE.push(path.join(projectDir, "wrangler.jsonc"));
    delete SCRIPTS.deploy;
    delete SCRIPTS["cf-typegen"];
  };
  const removeNetlify = () => {
    REMOVE_DEV_DEPS.push("@netlify/vite-plugin-tanstack-start");
    FILES_TO_REMOVE.push(path.join(projectDir, "netlify.toml"));
  };
  const removeNitro = () => {
    REMOVE_DEPS.push("nitro");
    delete SCRIPTS.start;
  };

  if (CTX.deployHost === "cloudflare") {
    SCRIPTS.postinstall = `${SCRIPTS.postinstall} && ${CTX.pkgManager} run cf-typegen`;
    removeNetlify();
    removeNitro();
  } else if (CTX.deployHost === "netlify") {
    removeCloudflare();
    removeNitro();
  } else if (CTX.useNitro) {
    removeCloudflare();
    removeNetlify();
    if (CTX.deployHost === "vercel") {
      delete SCRIPTS.start;
    }
  } else {
    removeCloudflare();
    removeNetlify();
    removeNitro();
  }

  await updatePackageJson({
    projectDir,
    removeDeps: REMOVE_DEPS,
    removeDevDeps: REMOVE_DEV_DEPS,
    scripts: SCRIPTS,
  });

  for (const file of FILES_TO_REMOVE) {
    await remove(file);
  }
}

main().catch((error) => {
  logger.error("An error occurred:");
  logger.error(error);
  process.exit(1);
});
