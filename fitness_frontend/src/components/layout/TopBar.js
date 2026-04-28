import React, { useMemo } from "react";
import styles from "./TopBar.module.css";

/**
 * PUBLIC_INTERFACE
 * Top information bar for the dashboard, including page title and quick actions.
 */
export default function TopBar({ pageTitle, onToggleSidebar, onOpenChat }) {
  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, []);

  return (
    <header className={styles.topbar} aria-label="Top bar">
      <div className={styles.left}>
        <button
          className={[styles.iconBtn].join(" ")}
          onClick={onToggleSidebar}
          type="button"
          aria-label="Toggle navigation"
          title="Menu"
        >
          <span aria-hidden="true">☰</span>
        </button>

        <div className={styles.titleBlock}>
          <div className={styles.title}>{pageTitle}</div>
          <div className={styles.subtitle}>
            {today} · Stay consistent, track progress
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.quickStat} title="Target streak (demo)">
          <span className={styles.qLabel}>Streak</span>
          <span className={styles.qValue}>6d</span>
        </div>
        <div className={styles.quickStat} title="Weekly minutes (demo)">
          <span className={styles.qLabel}>This week</span>
          <span className={styles.qValue}>142m</span>
        </div>

        <button className="btn btnPrimary" onClick={onOpenChat} type="button">
          Chat
          <span className={styles.kbdHint}>
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </span>
        </button>
      </div>
    </header>
  );
}
