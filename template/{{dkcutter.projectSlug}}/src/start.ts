{% if dkcutter.authProvider == "clerk" -%}
import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
{% endif -%}
{% if dkcutter.useSentry -%}
import {
  sentryGlobalFunctionMiddleware,
  sentryGlobalRequestMiddleware,
} from "@sentry/tanstackstart-react";
{% endif -%}
import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => {
  return {
{%- if dkcutter.useSentry and dkcutter.authProvider == "clerk" %}
    requestMiddleware: [sentryGlobalRequestMiddleware, clerkMiddleware()],
{%- elif dkcutter.useSentry %}
    requestMiddleware: [sentryGlobalRequestMiddleware],
{%- elif dkcutter.authProvider == "clerk" %}
    requestMiddleware: [clerkMiddleware()],
{%- endif %}
{%- if dkcutter.useSentry %}
    functionMiddleware: [sentryGlobalFunctionMiddleware],
{%- endif %}
  };
});
