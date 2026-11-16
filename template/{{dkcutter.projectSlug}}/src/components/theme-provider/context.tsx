import { createContext } from "react";

export type ResolvedTheme = "dark" | "light";
export type Theme = ResolvedTheme | "system";

export interface ThemeProviderState {
  /** The theme the user picked, `system` follows the OS preference. */
  theme: Theme;
  /** The theme applied to the page: `theme`, with `system` resolved. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
