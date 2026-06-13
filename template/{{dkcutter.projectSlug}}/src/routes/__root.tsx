import appCss from "@/styles.css?url";
{% if dkcutter.useTanstackQuery -%}
import type { QueryClient } from "@tanstack/react-query";
{% endif -%}
import type { ReactNode } from "react";
{%- if dkcutter.authProvider == "clerk" %}
import { ClerkProvider } from "@clerk/tanstack-react-start";
{%- endif %}
import { TanStackDevtools } from "@tanstack/react-devtools";
{%- if dkcutter.useTanstackQuery %}
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
{%- endif %}
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

interface MyRouterContext {% if dkcutter.useTanstackQuery %}{
  queryClient: QueryClient;
}{% else %}{}{% endif %}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "{{ dkcutter.projectName }}",
      },
      {
        name: "description",
        content: "{{ dkcutter.description }}",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
{%- if dkcutter.authProvider == "clerk" %}
        <ClerkProvider>{children}</ClerkProvider>
{%- else %}
        {children}
{%- endif %}
        <TanStackDevtools
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
{%- if dkcutter.useTanstackQuery %}
            {
              name: "Tanstack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
{%- endif %}
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
