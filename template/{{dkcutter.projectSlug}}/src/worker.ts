import { serveTunnelIntegration, withSentry } from "@sentry/cloudflare";
import handler from "./server";

interface SentryEnv {
  VITE_SENTRY_DSN?: string;
}

// Cloudflare Workers can't preload `instrument.server.mjs`, so Sentry is initialized here.
// eslint-disable-next-line import/no-default-export
export default withSentry(
  (env: SentryEnv) => ({
    dsn: env.VITE_SENTRY_DSN ?? import.meta.env.VITE_SENTRY_DSN,
    dataCollection: {
      // By default, the SDK sends user data, cookies, HTTP headers and bodies (values with
      // sensitive-looking keys are filtered). To send less, uncomment the lines below. For more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/cloudflare/configuration/options/#dataCollection
      // userInfo: false,
      // cookies: false,
      // httpBodies: [],
    },
    // Tunnel requests are answered in `src/server.ts`. The integration keeps them out of your traces.
    integrations: [serveTunnelIntegration({ intercept: false })],
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1,
  }),
  {
    {{ "async " if dkcutter.useEslintWithType }}fetch(request) {
      return handler.fetch(request);
    },
  },
);
