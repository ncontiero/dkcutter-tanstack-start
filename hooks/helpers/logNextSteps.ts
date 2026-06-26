import type { ContextProps } from "../utils/types";
import { logger } from "dkcutter/utils";

export function logNextSteps(ctx: ContextProps) {
  const pkgManager = ctx.pkgManager;
  const commands = [`cd ${ctx.projectSlug}`];

  if (!ctx.installDependencies) {
    commands.push(`${pkgManager} install`);
  }
  if (!ctx.initializeGit) {
    commands.push("git init", "git add .", `git commit -m "initial commit"`);
  }

  if (["betterAuth"].includes(ctx.authProvider) && ctx.usePrisma) {
    commands.push(
      `${pkgManager} run db:migrate ${pkgManager === "npm" ? "-- " : ""}--name init`,
    );
  }
  commands.push(`${ctx.pkgManager} run dev`);

  logger.break();
  logger.info(`Next steps:\n  ${commands.join("\n  ")}`);
}
