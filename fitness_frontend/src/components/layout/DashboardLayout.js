import React, { useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import styles from "./DashboardLayout.module.css";

/**
 * PUBLIC_INTERFACE
 * Dashboard layout shell with sidebar navigation and top info bar.
 */
export default function DashboardLayout({
  children,
  onOpenChat,
  onOpenOnboarding,
  onboardingDone,
}) {
  const location = useLocation();
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  const pageTitle = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/overview")) return "Overview";
    if (path.startsWith("/plans")) return "Workout Plans";
    if (path.startsWith("/log")) return "Log Workout";
    if (path.startsWith("/analytics")) return "Analytics";
    if (path.startsWith("/settings")) return "Settings";
    return "FitTrack";
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <aside
        className={[
          styles.sidebar,
          sidebarOpenMobile ? styles.sidebarOpen : "",
        ].join(" ")}
        aria-label="Primary navigation"
      >
        <div className={styles.brandRow}>
          <div className={styles.logo} aria-hidden="true">
            FT
          </div>
          <div>
            <div className={styles.brandName}>FitTrack</div>
            <div className={styles.brandSub}>Dashboard</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <NavItem to="/overview" label="Overview" onNavigate={() => setSidebarOpenMobile(false)} />
          <NavItem to="/plans" label="Plans" onNavigate={() => setSidebarOpenMobile(false)} />
          <NavItem to="/log" label="Log Workout" onNavigate={() => setSidebarOpenMobile(false)} />
          <NavItem to="/analytics" label="Analytics" onNavigate={() => setSidebarOpenMobile(false)} />
          <NavItem to="/settings" label="Settings" onNavigate={() => setSidebarOpenMobile(false)} />
        </nav>

        <div className={styles.sidebarFooter}>
          <button className="btn btnPrimary" onClick={onOpenChat} type="button">
            Coach Chat
          </button>
          <button
            className="btn"
            onClick={onOpenOnboarding}
            type="button"
            title="Re-open onboarding"
          >
            {onboardingDone ? "Onboarding (done)" : "Onboarding"}
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <TopBar
          pageTitle={pageTitle}
          onToggleSidebar={() => setSidebarOpenMobile((v) => !v)}
          onOpenChat={onOpenChat}
        />

        <main className={styles.content} role="main">
          {children}
        </main>
      </div>

      {sidebarOpenMobile && (
        <button
          className={styles.backdrop}
          aria-label="Close navigation"
          onClick={() => setSidebarOpenMobile(false)}
          type="button"
        />
      )}
    </div>
  );
}

function NavItem({ to, label, onNavigate }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [styles.navItem, isActive ? styles.navItemActive : ""].join(" ")
      }
      onClick={onNavigate}
    >
      <span className={styles.navDot} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}
