import * as Sentry from "@sentry/tanstackstart-react";

const sentryDsn =
  import.meta.env?.VITE_SENTRY_DSN ?? process.env.VITE_SENTRY_DSN;

Sentry.init({
  dsn: sentryDsn,
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1,
});
