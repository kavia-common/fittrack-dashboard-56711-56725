import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Modal from "./Modal";
import { AppConfigContext } from "../../context/AppConfigContext";

/**
 * PUBLIC_INTERFACE
 * Simple coach chat modal. If websocket URL is available, it will attempt a best-effort connection.
 */
export default function ChatModal({ open, onClose }) {
  const config = useContext(AppConfigContext);

  const [messages, setMessages] = useState(() => [
    {
      id: "m1",
      from: "coach",
      text: "Hi! Tell me what you’re working on today — strength, cardio, or mobility?",
    },
  ]);
  const [draft, setDraft] = useState("");

  const wsRef = useRef(null);

  const canUseWs = useMemo(() => {
    return Boolean(config?.wsUrl);
  }, [config?.wsUrl]);

  useEffect(() => {
    if (!open) return;
    if (!canUseWs) return;

    // Best-effort websocket connection. Backend may not support this yet; failures are non-fatal.
    try {
      const ws = new WebSocket(config.wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        // noop
      };
      ws.onmessage = (evt) => {
        setMessages((prev) => [
          ...prev,
          { id: String(Date.now()), from: "coach", text: String(evt.data) },
        ]);
      };
      ws.onerror = () => {
        // ignore
      };
      ws.onclose = () => {
        wsRef.current = null;
      };

      return () => {
        ws.close();
      };
    } catch {
      // ignore websocket connection errors
    }
  }, [open, canUseWs, config?.wsUrl]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), from: "me", text },
    ]);
    setDraft("");

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(text);
    } else {
      // Demo response if backend isn't connected.
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            from: "coach",
            text: "Got it. Consider starting with a 10-minute warmup, then 3–4 main lifts, then accessories. Want me to draft a plan?",
          },
        ]);
      }, 450);
    }
  };

  return (
    <Modal
      open={open}
      title="Coach Chat"
      onClose={onClose}
      footer={
        <div style={{ display: "flex", gap: 10, width: "100%" }}>
          <input
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about your plan, form cues, or progression…"
            onKeyDown={(e) => {
              if (e.key === "Enter") send();
            }}
            aria-label="Message"
          />
          <button className="btn btnPrimary" onClick={send} type="button">
            Send
          </button>
        </div>
      }
    >
      <div className="subtle" style={{ fontSize: 12, marginTop: 0 }}>
        {canUseWs ? (
          <>
            WebSocket: <code>{config.wsUrl}</code> (best-effort)
          </>
        ) : (
          <>WebSocket URL not configured; running in demo mode.</>
        )}
      </div>

      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              justifyContent: m.from === "me" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: 520,
                padding: "10px 12px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background:
                  m.from === "me"
                    ? "rgba(59, 130, 246, 0.12)"
                    : "rgba(255, 255, 255, 0.75)",
              }}
            >
              <div style={{ fontSize: 12, color: "var(--muted)" }}>
                {m.from === "me" ? "You" : "Coach"}
              </div>
              <div style={{ marginTop: 4, whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
