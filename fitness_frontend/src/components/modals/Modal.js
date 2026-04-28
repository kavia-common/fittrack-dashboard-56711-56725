import React, { useEffect } from "react";
import styles from "./Modal.module.css";

/**
 * PUBLIC_INTERFACE
 * Accessible modal dialog wrapper.
 */
export default function Modal({ open, title, children, onClose, footer }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <button
        className={styles.backdrop}
        aria-label="Close dialog"
        onClick={onClose}
        type="button"
      />
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className={styles.header}>
          <div className={styles.title}>{title}</div>
          <button className="btn" onClick={onClose} type="button">
            Close
          </button>
        </header>

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </section>
    </>
  );
}
