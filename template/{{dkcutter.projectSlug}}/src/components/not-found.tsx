import { Link } from "@tanstack/react-router";
import { ArrowLeft, House, SearchX } from "lucide-react";
{%- if dkcutter.useParaglideJs %}
import { m } from "@/paraglide/messages";
{%- endif %}

export function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="rounded-full bg-primary/10 p-4 text-primary">
        <SearchX className="size-8" />
      </span>
      <div className="space-y-2">
{%- if dkcutter.useParaglideJs %}
        <h1 className="text-3xl font-bold tracking-tight">
          {m.notFoundTitle()}
        </h1>
{%- else %}
        <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
{%- endif %}
        <p className="max-w-md text-muted-foreground">
{%- if dkcutter.useParaglideJs %}
          {m.notFoundDescription()}
{%- else %}
          The page you are looking for doesn't exist or has been moved.
{%- endif %}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="
            inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm
            transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
          "
        >
          <ArrowLeft className="size-4" />
{%- if dkcutter.useParaglideJs %}
          {m.goBack()}
{%- else %}
          Go back
{%- endif %}
        </button>
        <Link
          to="/"
          className="
            inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
            shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:outline-none
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
