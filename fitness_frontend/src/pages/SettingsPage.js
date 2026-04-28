import React, { useContext, useMemo, useState } from "react";
import { AppConfigContext } from "../context/AppConfigContext";

/**
 * PUBLIC_INTERFACE
 * Settings page with goal toggles and environment info display.
 */
export default function SettingsPage() {
  const config = useContext(AppConfigContext);
  const [units, setUnits] = useState("Imperial");
  const [privacy, setPrivacy] = useState(true);

  const envRows = useMemo(() => {
    return [
      ["REACT_APP_API_BASE", config.apiBase],
      ["REACT_APP_BACKEND_URL", config.backendUrl],
      ["REACT_APP_FRONTEND_URL", config.frontendUrl],
      ["REACT_APP_WS_URL", config.wsUrl],
      ["REACT_APP_NODE_ENV", config.nodeEnv],
      ["REACT_APP_EXPERIMENTS_ENABLED", String(config.experimentsEnabled)],
    ];
  }, [config]);

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <section className="card cardPad">
        <h1 className="h1">Settings</h1>
        <div className="subtle" style={{ marginTop: 6 }}>
          Demo settings (in-memory). Connect to backend/user profile as needed.
        </div>

        <div className="grid" style={{ marginTop: 14 }}>
          <div className="card cardPad">
            <div style={{ fontWeight: 900 }}>Units</div>
            <div className="subtle" style={{ marginTop: 6 }}>
              Choose how you want weights/distances displayed.
            </div>
            <select
              className="input"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              style={{ marginTop: 10 }}
              aria-label="Units"
            >
              <option>Imperial</option>
              <option>Metric</option>
            </select>
          </div>

          <div className="card cardPad">
            <div style={{ fontWeight: 900 }}>Privacy</div>
            <div className="subtle" style={{ marginTop: 6 }}>
              When enabled, hides sensitive stats on shared screens.
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
              />
              <span>{privacy ? "Enabled" : "Disabled"}</span>
            </label>
          </div>
        </div>
      </section>

      <section className="card cardPad">
        <div style={{ fontWeight: 900 }}>Environment</div>
        <div className="subtle" style={{ marginTop: 6 }}>
          Read-only values from container env. Do not hardcode.
        </div>

        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
            <thead>
              <tr style={{ textAlign: "left", fontSize: 12, color: "var(--muted)" }}>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {envRows.map(([k, v]) => (
                <tr key={k}>
                  <td style={{ fontWeight: 800, paddingRight: 10 }}>{k}</td>
                  <td>
                    <code
                      style={{
                        display: "inline-block",
                        padding: "6px 8px",
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.6)",
                        maxWidth: 520,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "middle",
                      }}
                      title={v || ""}
                    >
                      {v || "(unset)"}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
