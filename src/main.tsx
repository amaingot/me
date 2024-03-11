import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import * as Sentry from "@sentry/react";

import App from "./App";
import { theme } from "./utils/theme";

import "@mantine/core/styles.css";
import config from "./utils/config";

Sentry.init({
  dsn: "https://751b03c46b3eb173863b3bb7757540e3@o1094986.ingest.us.sentry.io/4506892898992128",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: config.ENV,
  release: config.SHA,
  enabled: config.ENV !== "local",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
