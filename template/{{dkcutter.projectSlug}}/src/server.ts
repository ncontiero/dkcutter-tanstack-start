{% if dkcutter.useSentry and dkcutter.deployHost in ["vercel", "netlify"] -%}
// Serverless functions can't preload it with `--import`, so Sentry is initialized here.
// It must be the first import.
import "../instrument.server.mjs";
{% endif -%}
{% if dkcutter.useSentry -%}
import {
  handleTunnelRequestIfMatched,
  wrapFetchWithSentry,
} from "@sentry/tanstackstart-react";
{% endif -%}
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
{%- if dkcutter.useParaglideJs %}
import { paraglideMiddleware } from "./paraglide/server.js";
{%- endif %}

{%- if dkcutter.useSentry %}

// Inlined by Vite at build time, so it's available on every deploy target.
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
{%- endif %}

// eslint-disable-next-line import/no-default-export
{%- if dkcutter.useSentry %}
export default createServerEntry(
  wrapFetchWithSentry({
    {{ "async " if dkcutter.useEslintWithType }}fetch(request: Request) {
      // Forward the events the browser sends through the tunnel (`tunnel: true`) to Sentry.
      const tunnelResponse = sentryDsn
        ? handleTunnelRequestIfMatched(request, { allowedDsns: [sentryDsn] })
        : undefined;
      if (tunnelResponse) return tunnelResponse;

{%- if dkcutter.useParaglideJs %}
      return paraglideMiddleware(request, {{ "async " if dkcutter.useEslintWithType }}() => handler.fetch(request));
{%- else %}
      return handler.fetch(request);
{%- endif %}
    },
  }),
);
{%- elif dkcutter.useParaglideJs %}
export default createServerEntry({
  {{ "async " if dkcutter.useEslintWithType }}fetch(req: Request) {
    return paraglideMiddleware(req, {{ "async " if dkcutter.useEslintWithType }}() => handler.fetch(req));
  },
});
{%- endif %}
