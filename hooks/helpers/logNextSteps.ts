import type { ContextProps } from "../utils/types";
import * as p from "@clack/prompts";
import { dim } from "ansis";

export function logNextSteps(ctx: ContextProps, hasGitInitialized: boolean) {
  const {
    projectSlug,
    installDependencies,
    initializeGit,
    pkgManager,
    authProvider,
    usePrisma,
    useDrizzle,
  } = ctx;
  const commands = [`cd ${projectSlug}`];

  if (!installDependencies) {
    commands.push(`${pkgManager} install`);
  }
  if (!initializeGit || !hasGitInitialized) {
    commands.push("git init", "git add .", `git commit -m "initial commit"`);
  }

  // Better Auth needs its tables before the first sign-up.
  if (authProvider === "betterAuth" && usePrisma) {
    commands.push(
      `${pkgManager} run db:migrate ${pkgManager === "npm" ? "-- " : ""}--name init`,
    );
  } else if (authProvider === "betterAuth" && useDrizzle) {
    commands.push(
      `${pkgManager} run db:generate`,
      `${pkgManager} run db:migrate`,
    );
  }
  commands.push(`${pkgManager} run dev`);

  p.note(commands.join("\n"), "Next steps", {
    format: (line: string) => dim(line),
  });
}
