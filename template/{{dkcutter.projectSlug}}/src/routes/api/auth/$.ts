import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
{%- if dkcutter.useEslintWithType %}
      GET: async ({ request }) => auth.handler(request),
      POST: async ({ request }) => auth.handler(request),
{%- else %}
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
{%- endif %}
    },
  },
});
