import * as Sentry from "@sentry/tanstackstart-react";
import { env } from "./env";

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  integrations: [Sentry.replayIntegration()],
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Set tracesSampleRate to 1 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  // Learn more at https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1,
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error.
  // Learn more at https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
});
