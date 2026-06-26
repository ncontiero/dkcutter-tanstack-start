import type { PackageManager } from "../utils/types";
import type { SpawnOptions } from "node:child_process";
import { x } from "tinyexec";
import { spinner } from "../utils/spinner";

interface ExecWithSpinnerProps {
  projectDir: string;
  pkgManager: PackageManager;
  args?: string[];
  stdio?: SpawnOptions["stdio"];
  onDataHandle?: (data: Buffer) => void;
}

export async function execWithSpinner({
  projectDir,
  pkgManager,
  args = ["install"],
  stdio = "pipe",
  onDataHandle,
}: ExecWithSpinnerProps) {
  spinner.setText(`Running ${pkgManager} ${args.join(" ")}...`);
  !spinner.running && spinner.start();

  const { process } = x(pkgManager, args, {
    nodeOptions: { cwd: projectDir, stdio },
  });

  await new Promise<void>((resolve, reject) => {
    if (onDataHandle) {
      process?.stdout?.on("data", onDataHandle);
    }

    process?.on("error", (e) => reject(e));
    process?.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process exited with code ${code}`));
      }
    });
  });
}

interface RunPKGCommandProps {
  pkgManager: PackageManager;
  projectDir: string;
  args?: string[];
}

export async function runPgkCommand({
  pkgManager,
  projectDir,
  args = ["install"],
}: RunPKGCommandProps) {
  const onDataHandle = (data: Buffer) => {
    const text = data.toString();
    spinner.setText(
      pkgManager === "pnpm" && text.includes("Progress") && text.includes("|")
        ? (text.split(" | ")[1] ?? "")
        : text,
    );
  };

  switch (pkgManager) {
    case "npm":
      await x(pkgManager, args, {
        nodeOptions: { cwd: projectDir, stdio: "inherit" },
      });
      return null;
    case "pnpm":
    case "yarn":
    case "bun":
      return execWithSpinner({
        projectDir,
        pkgManager,
        args,
        stdio: pkgManager === "bun" ? "ignore" : "pipe",
        onDataHandle,
      });
  }
}
