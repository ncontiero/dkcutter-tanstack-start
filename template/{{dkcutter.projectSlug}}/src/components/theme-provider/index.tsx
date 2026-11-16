import {
  type ReactNode,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { ScriptOnce } from "@tanstack/react-router";
import {
  type ResolvedTheme,
  type Theme,
  ThemeProviderContext,
} from "./context";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

const MEDIA = "(prefers-color-scheme: dark)";
const THEMES: readonly string[] = ["light", "dark", "system"];

const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && THEMES.includes(value);

/**
 * Applies the theme to `<html>`: the resolved theme as a class (for Tailwind's `dark:` variant)
 * and `color-scheme`, and the picked theme as `data-theme` (to style by it without JavaScript).
 */
function applyTheme(theme: Theme, resolvedTheme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
  root.dataset.theme = theme;
}

// Runs before hydration (see `ScriptOnce`), so the page is painted with the right theme.
function getThemeScript(storageKey: string, defaultTheme: Theme) {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultTheme);
  const media = JSON.stringify(MEDIA);

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var r=t==='system'?(matchMedia(${media}).matches?'dark':'light'):t;var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(r);e.style.colorScheme=r;e.dataset.theme=t}catch(e){}})();`;
}

/**
 * Keeps the picked theme in `localStorage` and the OS preference in `matchMedia`, so React reads
 * them with `useSyncExternalStore`. The `storage` event also syncs the theme across tabs.
 */
function createThemeStore(storageKey: string, defaultTheme: Theme) {
  const getTheme = (): Theme => {
    try {
      const stored = localStorage.getItem(storageKey);
      return isTheme(stored) ? stored : defaultTheme;
    } catch {
      return defaultTheme;
    }
  };

  const getSystemTheme = (): ResolvedTheme =>
    window.matchMedia(MEDIA).matches ? "dark" : "light";

  const subscribe = (onChange: () => void) => {
    const mediaQuery = window.matchMedia(MEDIA);
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) onChange();
    };

    mediaQuery.addEventListener("change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      mediaQuery.removeEventListener("change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  };

  const setTheme = (theme: Theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Storage can be unavailable (e.g. private mode): the theme still applies to this page.
    }
    // The browser fires `storage` only in other tabs, so notify this one too.
    window.dispatchEvent(
      new StorageEvent("storage", { key: storageKey, newValue: theme }),
    );
  };

  return { getTheme, getSystemTheme, subscribe, setTheme };
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: ThemeProviderProps) {
  const store = useMemo(
    () => createThemeStore(storageKey, defaultTheme),
    [storageKey, defaultTheme],
  );

  const theme = useSyncExternalStore(
    store.subscribe,
    store.getTheme,
    () => defaultTheme,
  );
  const systemTheme = useSyncExternalStore(
    store.subscribe,
    store.getSystemTheme,
    (): ResolvedTheme => "light",
  );
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // The theme script sets the initial theme, so this only applies later changes.
  useEffect(
    () =>
      store.subscribe(() => {
        const theme = store.getTheme();
        applyTheme(theme, theme === "system" ? store.getSystemTheme() : theme);
      }),
    [store],
  );

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: store.setTheme }),
    [theme, resolvedTheme, store],
  );

  return (
    <ThemeProviderContext value={value}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeProviderContext>
  );
}
