import type {
  AuthProvider,
  AutomatedDepsUpdater,
  ContextProps,
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
  automatedDepsUpdater:
    "{{ dkcutter.automatedDepsUpdater }}" as AutomatedDepsUpdater,
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
  let SCRIPTS = packageJson.scripts || {};
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
    FILES_TO_REMOVE.push(srcFolder, "start.ts");
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

  if (CTX.useTriggerDev) {
    const newDevScript = `concurrently --kill-others --names "tanstack,trigger" --prefix-colors "red,green" "${SCRIPTS.dev}" "${CTX.pkgManager} run trigger:dev"`;
    SCRIPTS.dev = newDevScript;
    SCRIPTS = {
      ...SCRIPTS,
      "trigger:dev": "trigger dev",
      "trigger:deploy": "trigger deploy",
    };
  } else {
    REMOVE_DEPS.push("@trigger.dev/sdk");
    REMOVE_DEV_DEPS.push("@trigger.dev/build", "trigger.dev", "concurrently");
    FILES_TO_REMOVE.push(
      path.join(projectDir, "trigger.config.ts"),
      path.join(srcFolder, "trigger"),
    );
  }

  if (CTX.usePrisma) {
    const prismaScriptsToAdd = {
      "db:generate": "dotenv -e .env.local -- prisma generate",
      "db:push": "dotenv -e .env.local -- prisma db push",
      "db:migrate": "dotenv -e .env.local -- prisma migrate dev",
      "db:studio": "dotenv -e .env.local -- prisma studio",
      "db:seed": "dotenv -e .env.local -- prisma db seed",
      postinstall: `${
        SCRIPTS.postinstall ? `${SCRIPTS.postinstall} && ` : ""
      }${CTX.pkgManager} run db:generate`,
    };

    delete SCRIPTS.postinstall;
    Object.assign(SCRIPTS, prismaScriptsToAdd);
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
      path.join(libFolder, "prisma"),
    );
  }

  if (CTX.useLintStaged) {
    SCRIPTS["pre-commit"] = "lint-staged";
  } else {
    REMOVE_DEV_DEPS.push("lint-staged");
  }

  if (CTX.useNanoStaged) {
    SCRIPTS["pre-commit"] = "nano-staged";
    if (CTX.useLintStaged) {
      logger.warn(
        "You have selected both lint-staged and nano-staged. nano-staged will be used for the pre-commit script.",
      );
    }
  } else {
    REMOVE_DEV_DEPS.push("nano-staged");
    await updatePackageJson({ projectDir, keys: ["nano-staged"] });
  }

  if (CTX.useCommitlint) {
    SCRIPTS.commitlint = "commitlint --edit";
  } else {
    REMOVE_DEV_DEPS.push("@commitlint/cli", "@commitlint/config-conventional");
    FILES_TO_REMOVE.push(
      path.join(projectDir, ".commitlintrc.json"),
      path.join(projectDir, ".husky", "commit-msg"),
    );
  }

  if (CTX.useHusky) {
    SCRIPTS.prepare = "husky";
  } else {
    REMOVE_DEV_DEPS.push("husky");
    FILES_TO_REMOVE.push(path.join(projectDir, ".husky"));
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

  if (SCRIPTS?.postinstall) {
    const postinstall = SCRIPTS.postinstall;
    delete SCRIPTS.postinstall;
    SCRIPTS = { ...SCRIPTS, postinstall };
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
