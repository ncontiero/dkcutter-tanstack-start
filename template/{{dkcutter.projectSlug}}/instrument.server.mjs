import * as Sentry from "@sentry/tanstackstart-react";

const sentryDsn =
  import.meta.env?.VITE_SENTRY_DSN ?? process.env.VITE_SENTRY_DSN;

Sentry.init({
  dsn: sentryDsn,
  dataCollection: {
    // By default, the SDK sends user data, cookies, HTTP headers and bodies (values with
    // sensitive-looking keys are filtered). To send less, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#dataCollection
    // userInfo: false,
    // cookies: false,
    // httpBodies: [],
  },
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1,
});
