import { useEffect } from "react";
import {
  type ErrorComponentProps,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { House, RotateCw, TriangleAlert } from "lucide-react";
{%- if dkcutter.useParaglideJs %}
import { m } from "@/paraglide/messages";
{%- endif %}

export function DefaultCatchBoundary({ error, reset }: ErrorComponentProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="rounded-full bg-destructive/10 p-4 text-destructive">
        <TriangleAlert className="size-8" />
      </span>
      <div className="space-y-2">
{%- if dkcutter.useParaglideJs %}
        <h1 className="text-3xl font-bold tracking-tight">{m.errorTitle()}</h1>
        <p className="max-w-md text-muted-foreground">{m.errorDescription()}</p>
{%- else %}
        <h1 className="text-3xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="max-w-md text-muted-foreground">
          An unexpected error occurred. Try again, or go back to the home page.
        </p>
{%- endif %}
      </div>
      {/* Only show error details in development to avoid leaking sensitive information */}
      {import.meta.env.DEV ? (
        <pre className="max-w-2xl overflow-auto rounded-md border bg-muted p-4 text-left text-sm">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      ) : null}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            reset();
            void router.invalidate();
          }}
          className="
            inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
            shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:outline-none
          "
        >
          <RotateCw className="size-4" />
{%- if dkcutter.useParaglideJs %}
          {m.tryAgain()}
{%- else %}
          Try again
{%- endif %}
        </button>
        <Link
          to="/"
          className="
            inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm
            transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
          "
        >
          <House className="size-4" />
{%- if dkcutter.useParaglideJs %}
          {m.goHome()}
{%- else %}
          Go home
{%- endif %}
        </Link>
      </div>
    </div>
  );
}
