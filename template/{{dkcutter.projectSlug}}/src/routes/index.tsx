import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Rocket } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-12 text-center">
        {/* Hero Section */}
        <div className="space-y-6">
          <div
            className="
              inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground shadow-sm
              backdrop-blur-md
            "
          >
            <span className="mr-2 flex size-2 animate-pulse rounded-full bg-primary"></span>
            Powered by DKCutter & TanStack Start
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            Welcome to <br />
            <span
              className="
                bg-linear-to-r from-primary via-primary/60 to-foreground bg-clip-text text-transparent dark:via-none
              "
            >
              {{ dkcutter.projectName }}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg/relaxed text-muted-foreground sm:text-xl">
            {{ dkcutter.description }}
          </p>
        </div>

        {/* Action Cards */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 pt-8 md:grid-cols-2">
          <div
            className="
              group relative overflow-hidden rounded-2xl border bg-card p-8 text-left shadow-sm transition-all
              hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10
            "
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-10 transition-opacity group-hover:opacity-20">
              <Rocket className="size-32 text-primary" strokeWidth={1} />
            </div>
            <h3 className="mb-2 flex items-center text-xl font-semibold text-foreground">
              <span className="mr-3 rounded-lg bg-primary/10 p-2 text-primary shadow-sm">
                <Rocket className="size-5" />
              </span>
              Get Started
            </h3>
            <p className="relative z-10 mb-6 text-muted-foreground">
              Start building your application by editing{" "}
              <code className="rounded-sm border bg-muted px-1.5 py-0.5 font-mono text-sm text-primary">
                src/routes/index.tsx
              </code>
              .
            </p>
          </div>

          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noreferrer"
            className="
              group relative block overflow-hidden rounded-2xl border bg-card p-8 text-left shadow-sm transition-all
              outline-none hover:-translate-y-1 hover:shadow-md hover:shadow-primary/10 focus:ring-2 focus:ring-ring
              focus:ring-offset-2 focus:ring-offset-background
            "
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-10 transition-opacity group-hover:opacity-20">
              <BookOpen className="size-32 text-primary" strokeWidth={1} />
            </div>
            <h3 className="mb-2 flex items-center text-xl font-semibold">
              <span className="mr-3 rounded-lg bg-primary/10 p-2 text-primary shadow-sm">
                <BookOpen className="size-5" />
              </span>
              Documentation
            </h3>
            <p className="relative z-10 mb-6 text-muted-foreground">
              Learn how to fetch data, handle mutations, and build your
              full-stack app with TanStack Start.
            </p>
            <span className="relative z-10 flex items-center font-medium text-primary group-hover:underline">
              Read the docs
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
