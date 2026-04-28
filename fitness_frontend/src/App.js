import React, { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import OverviewPage from "./pages/OverviewPage";
import PlansPage from "./pages/PlansPage";
import LogWorkoutPage from "./pages/LogWorkoutPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import { AppConfigContext } from "./context/AppConfigContext";
import { useLocalStorageBoolean } from "./hooks/useLocalStorageBoolean";
import OnboardingModal from "./components/modals/OnboardingModal";
import ChatModal from "./components/modals/ChatModal";

/**
 * PUBLIC_INTERFACE
 * Root React application component with routing and global modals.
 */
export default function App() {
  const config = useMemo(
    () => ({
      apiBase: process.env.REACT_APP_API_BASE,
      backendUrl: process.env.REACT_APP_BACKEND_URL,
      frontendUrl: process.env.REACT_APP_FRONTEND_URL,
      wsUrl: process.env.REACT_APP_WS_URL,
      nodeEnv: process.env.REACT_APP_NODE_ENV,
      featureFlagsRaw: process.env.REACT_APP_FEATURE_FLAGS,
      experimentsEnabled: process.env.REACT_APP_EXPERIMENTS_ENABLED === "true",
    }),
    []
  );

  const [onboardingDone, setOnboardingDone] = useLocalStorageBoolean(
    "fittrack:onboardingDone",
    false
  );

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <AppConfigContext.Provider value={config}>
      <BrowserRouter>
        <DashboardLayout
          onOpenChat={() => setChatOpen(true)}
          onOpenOnboarding={() => setOnboardingDone(false)}
          onboardingDone={onboardingDone}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/overview" replace />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/log" element={<LogWorkoutPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Routes>
        </DashboardLayout>

        {!onboardingDone && (
          <OnboardingModal
            onClose={() => setOnboardingDone(true)}
            onOpenChat={() => setChatOpen(true)}
          />
        )}

        <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
      </BrowserRouter>
    </AppConfigContext.Provider>
  );
}
