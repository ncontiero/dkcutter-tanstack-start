{% if dkcutter.useTanstackQuery -%}
import { QueryClient } from "@tanstack/react-query";
{% endif -%}
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
{%- if dkcutter.useTanstackQuery %}
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
{%- endif %}
{%- if dkcutter.useParaglideJs %}
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
{%- endif %}
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  {% if dkcutter.useTanstackQuery -%}
  const queryClient = new QueryClient();

  {% endif -%}

  const router = createTanStackRouter({
    routeTree,
    context: {
      // Define the context for the router
{%- if dkcutter.useTanstackQuery %}
      queryClient,
{%- endif %}
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
{%- if dkcutter.useParaglideJs %}
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
{%- endif %}
  });

  {% if dkcutter.useTanstackQuery -%}
  setupRouterSsrQueryIntegration({ router, queryClient });

  {% endif -%}

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
