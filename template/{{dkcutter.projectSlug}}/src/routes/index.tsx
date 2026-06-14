import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div
      className="
        flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 font-sans text-slate-300 sm:p-12
      "
    >
      <div className="w-full max-w-4xl space-y-12 text-center">
        {/* Hero Section */}
        <div className="space-y-6">
          <div
            className="
              inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm
              text-slate-300 shadow-sm backdrop-blur-md
            "
          >
            <span className="mr-2 flex size-2 animate-pulse rounded-full bg-[#8e51ff] shadow-[0_0_8px_#8e51ff]"></span>
            Powered by DKCutter & TanStack Start
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Welcome to <br />
            <span className="bg-linear-to-r from-[#8e51ff] to-[#b388ff] bg-clip-text text-transparent">
              My Awesome Project
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg/relaxed text-slate-400 sm:text-xl">
            Behold My Awesome Project!
          </p>
        </div>

        {/* Action Cards */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 pt-8 md:grid-cols-2">
          <div
            className="
              group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left shadow-sm
              transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-[#8e51ff]/10
            "
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-10 transition-opacity group-hover:opacity-20">
              <svg
                className="size-32 text-[#8e51ff]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="mb-2 flex items-center text-xl font-semibold text-white">
              <span className="mr-3 rounded-lg bg-[#8e51ff]/10 p-2 text-[#8e51ff] shadow-sm">
                🚀
              </span>
              Get Started
            </h3>
            <p className="relative z-10 mb-6 text-slate-400">
              Start building your application by editing{" "}
              <code
                className="
                  rounded-sm border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-[#8e51ff]
                "
              >
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
              group relative block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left
              shadow-sm transition-all outline-none hover:-translate-y-1 hover:shadow-md hover:shadow-[#8e51ff]/10
              focus:ring-2 focus:ring-[#8e51ff] focus:ring-offset-2 focus:ring-offset-slate-950
            "
          >
            <div className="absolute -top-4 -right-4 p-4 opacity-10 transition-opacity group-hover:opacity-20">
              <svg
                className="size-32 text-[#8e51ff]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <h3 className="mb-2 flex items-center text-xl font-semibold text-white">
              <span className="mr-3 rounded-lg bg-[#8e51ff]/10 p-2 text-[#8e51ff] shadow-sm">
                📚
              </span>
              Documentation
            </h3>
            <p className="relative z-10 mb-6 text-slate-400">
              Learn how to fetch data, handle mutations, and build your
              full-stack app with TanStack Start.
            </p>
            <span className="relative z-10 flex items-center font-medium text-[#8e51ff] group-hover:underline">
              Read the docs
              <svg
                className="ml-1 size-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
