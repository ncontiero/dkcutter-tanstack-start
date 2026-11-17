import { m } from "@/paraglide/messages";
import {
  type Locale,
  getLocale,
  locales,
  setLocale,
} from "@/paraglide/runtime";

// Typed by the locales in `project.inlang/settings.json`: add a name when you add a locale.
const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
};

export function LocaleSwitcher() {
  return (
    <select
      aria-label={m.localeSwitcherLabel()}
      value={getLocale()}
      onChange={{ "{" }}{{ "async " if dkcutter.useEslintWithType }}(event) => setLocale(event.target.value as Locale){{ "}" }}
      className="
        h-9 rounded-md border bg-background px-2 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted
        hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
      "
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {LOCALE_NAMES[locale]}
        </option>
      ))}
    </select>
  );
}
