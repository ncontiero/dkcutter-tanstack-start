{%- set i18n = dkcutter.useParaglideJs -%}
{%- set ui = dkcutter.useShadcn -%}
{%- macro text(on, key, value) -%}
{%- if on -%}{m.{{ key }}()}{%- else -%}{{ value|safe }}{%- endif -%}
{%- endmacro -%}
{% if dkcutter.authProvider == "clerk" -%}
import { Show, SignInButton, UserButton } from "@clerk/tanstack-react-start";
{%- if ui %}
import { Button } from "@/components/ui/button";
{%- endif %}
{%- if i18n %}
import { m } from "@/paraglide/messages";
{%- endif %}

export function HeaderUser() {
  return (
    <>
      <Show when="signed-in">
        <UserButton />
      </Show>
      <Show when="signed-out">
        <SignInButton mode="modal">
{%- if ui %}
          <Button variant="outline">{{ text(i18n, "authSignIn", "Sign in") }}</Button>
{%- else %}
          <button
            type="button"
            className="
              inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm
              transition-colors hover:bg-muted
            "
          >
            {{ text(i18n, "authSignIn", "Sign in") }}
          </button>
{%- endif %}
        </SignInButton>
      </Show>
    </>
  );
}
{%- else -%}
import { Link } from "@tanstack/react-router";
{%- if ui %}
import { Button } from "@/components/ui/button";
{%- endif %}
import { authClient } from "@/lib/auth/client";
{%- if i18n %}
import { m } from "@/paraglide/messages";
{%- endif %}

// The sign-in link is a styled `<Link>`, not a `<Button>`: it navigates, so it keeps the link role.
const outlineClassName =
  "inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-muted";

export function HeaderUser() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />;
  }

  if (!session) {
    return (
      <Link to="/sign-in" className={outlineClassName}>
        {{ text(i18n, "authSignIn", "Sign in") }}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        {session.user.name}
      </span>
{%- if ui %}
      <Button variant="outline" onClick={{ "{" }}{{ "async " if dkcutter.useEslintWithType }}() => authClient.signOut(){{ "}" }}>
        {{ text(i18n, "authSignOut", "Sign out") }}
      </Button>
{%- else %}
      <button
        type="button"
        onClick={{ "{" }}{{ "async " if dkcutter.useEslintWithType }}() => authClient.signOut(){{ "}" }}
        className={outlineClassName}
      >
        {{ text(i18n, "authSignOut", "Sign out") }}
      </button>
{%- endif %}
    </div>
  );
}
{%- endif %}
