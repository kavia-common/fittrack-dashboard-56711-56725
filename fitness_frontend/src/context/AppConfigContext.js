import React from "react";

/**
 * PUBLIC_INTERFACE
 * React context that exposes runtime configuration from environment variables.
 */
export const AppConfigContext = React.createContext({
  apiBase: undefined,
  backendUrl: undefined,
  frontendUrl: undefined,
  wsUrl: undefined,
  nodeEnv: "development",
  featureFlagsRaw: "{}",
  experimentsEnabled: false,
});
