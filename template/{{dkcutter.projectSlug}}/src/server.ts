{% if dkcutter.useSentry -%}
import { wrapFetchWithSentry } from "@sentry/tanstackstart-react";
{% endif -%}
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";
{%- if dkcutter.useParaglideJs %}
import { paraglideMiddleware } from "./paraglide/server.js";
{%- endif %}

// eslint-disable-next-line import/no-default-export
{%- if dkcutter.useSentry %}
export default createServerEntry(
  wrapFetchWithSentry({
    {{ "async " if dkcutter.useEslintWithType }}fetch(request: Request) {
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
