import type { ContextProps } from "../utils/types";
import * as p from "@clack/prompts";
import { dim } from "ansis";

export function logNextSteps(ctx: ContextProps) {
  const {
    projectSlug,
    installDependencies,
    initializeGit,
    pkgManager,
    authProvider,
    usePrisma,
  } = ctx;
  const commands = [`cd ${projectSlug}`];

  if (!installDependencies) {
    commands.push(`${pkgManager} install`);
  }
  if (!initializeGit) {
    commands.push("git init", "git add .", `git commit -m "initial commit"`);
  }

  if (["betterAuth"].includes(authProvider) && usePrisma) {
    commands.push(
      `${pkgManager} run db:migrate ${pkgManager === "npm" ? "-- " : ""}--name init`,
    );
  }
  commands.push(`${pkgManager} run dev`);

  p.note(commands.join("\n"), "Next steps", {
    format: (line: string) => dim(line),
  });
}
