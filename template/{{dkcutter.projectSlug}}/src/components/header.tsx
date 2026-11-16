import type { Theme } from "./theme-provider/context";
import { Link } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
{%- if dkcutter.useParaglideJs %}
import { m } from "@/paraglide/messages";
{%- endif %}
import { useTheme } from "./theme-provider/hooks";

const NEXT_THEME: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

export function Header() {
  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold tracking-tight transition-colors hover:text-primary"
          >
            <span className="flex size-6 items-center justify-center rounded-md bg-primary shadow-sm">
              <span className="size-2 rounded-full bg-background" />
            </span>
            {{ dkcutter.projectName }}
          </Link>
          <nav className="hidden gap-4 md:flex">
            <Link
              to="/"
              className="
                text-sm font-medium text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground
              "
            >
{%- if dkcutter.useParaglideJs %}
              {m.headerNavHome()}
{%- else %}
              Home
{%- endif %}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(NEXT_THEME[theme])}
            className="
              inline-flex size-9 items-center justify-center rounded-md border bg-background text-muted-foreground shadow-sm
              transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring
              focus-visible:outline-none
            "
{%- if dkcutter.useParaglideJs %}
            aria-label={m.headerThemeToggle()}
{%- else %}
            aria-label="Toggle theme"
{%- endif %}
          >
            {/* Picked by the `data-theme` the theme script sets, so the icon is right before hydration */}
            <Sun className="hidden size-4.5 in-data-[theme=light]:block" />
            <Moon className="hidden size-4.5 in-data-[theme=dark]:block" />
            <Monitor className="size-4.5 in-data-[theme=dark]:hidden in-data-[theme=light]:hidden" />
          </button>
        </div>
      </div>
    </header>
  );
}
