import { use } from "react";
import { ThemeProviderContext } from "./context";

export function useTheme() {
  return use(ThemeProviderContext);
}
