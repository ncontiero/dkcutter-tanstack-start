import appCss from "@/styles.css?url";
import type { ReactNode } from "react";
{% if dkcutter.useTanstackQuery -%}
import type { QueryClient } from "@tanstack/react-query";
{% endif -%}
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
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col">
        <ThemeProvider>
{%- if dkcutter.authProvider == "clerk" %}
          <ClerkProvider>
            <Header />
            <main className="flex-1">{children}</main>
          </ClerkProvider>
{%- else %}
          <Header />
          <main className="flex-1">{children}</main>
{%- endif %}
        </ThemeProvider>
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
