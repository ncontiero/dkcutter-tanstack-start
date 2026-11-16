{% if dkcutter.authProvider == "clerk" -%}
import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
{% endif -%}
{% if dkcutter.useSentry -%}
import {
  sentryGlobalFunctionMiddleware,
  sentryGlobalRequestMiddleware,
} from "@sentry/tanstackstart-react";
{% endif -%}
import { createCsrfMiddleware, createStart } from "@tanstack/react-start";

// A custom `src/start.ts` disables Start's automatic CSRF protection for server functions,
// so it must be added explicitly. See https://tanstack.com/start/latest/docs/framework/react/guide/middleware#csrf-middleware
const csrfMiddleware = createCsrfMiddleware({
  filter: (context) => context.handlerType === "serverFn",
});

export const startInstance = createStart(() => {
  return {
{%- if dkcutter.useSentry and dkcutter.authProvider == "clerk" %}
    requestMiddleware: [
      sentryGlobalRequestMiddleware,
      csrfMiddleware,
      clerkMiddleware(),
    ],
{%- elif dkcutter.useSentry %}
    requestMiddleware: [sentryGlobalRequestMiddleware, csrfMiddleware],
{%- else %}
    requestMiddleware: [csrfMiddleware, clerkMiddleware()],
{%- endif %}
{%- if dkcutter.useSentry %}
    functionMiddleware: [sentryGlobalFunctionMiddleware],
{%- endif %}
  };
});
