import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
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
const isBrowser = typeof window !== "undefined";

function getThemeScript(storageKey: string, defaultTheme: Theme) {
  const key = JSON.stringify(storageKey);
  const fallback = JSON.stringify(defaultTheme);
  const media = JSON.stringify(MEDIA);

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia(${media}).matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const getStoredTheme = useCallback((): ResolvedTheme => {
    if (!isBrowser) return "light";
    const stored = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    if (stored === "system") {
      return window.matchMedia(MEDIA).matches ? "dark" : "light";
    }
    return ["dark", "light"].includes(stored) ? stored : "light";
  }, [defaultTheme, storageKey]);

  const updateTheme = useCallback((theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const resolved =
      theme === "system"
        ? window.matchMedia(MEDIA).matches
          ? "dark"
          : "light"
        : theme;

    setTheme(resolved);
    root.classList.add(theme);
    root.style.colorScheme = resolved;
  }, []);

  const _setTheme = useCallback(
    (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      updateTheme(theme);
    },
    [storageKey, updateTheme],
  );

  useEffect(() => {
    const onMediaChange = () => updateTheme(getStoredTheme());
    onMediaChange();

    const mediaQuery = window.matchMedia(MEDIA);
    mediaQuery.addEventListener("change", onMediaChange);
    return () => mediaQuery.removeEventListener("change", onMediaChange);
  }, [getStoredTheme, updateTheme]);

  const value = useMemo(
    () => ({ theme, setTheme: _setTheme }),
    [_setTheme, theme],
  );

  return (
    <ThemeProviderContext value={value}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeProviderContext>
  );
}
