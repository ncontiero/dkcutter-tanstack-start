import type { PackageManager } from "../utils/types";

import { colorize, logger } from "dkcutter/utils";
import { spinner } from "../utils/spinner";
import { runPgkCommand } from "./runPkgCommand";

export async function installDependencies(
  projectDir: string,
  pkgManager: PackageManager,
) {
  logger.break();
  logger.info("Installing dependencies. This might take a while...");

  await runPgkCommand({ pkgManager, projectDir });
  spinner.succeed(colorize("success", "Successfully installed dependencies!"));
}
