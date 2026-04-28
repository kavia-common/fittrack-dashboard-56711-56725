import React, { useMemo } from "react";

/**
 * PUBLIC_INTERFACE
 * Analytics page with simplified trend visualization (demo).
 */
export default function AnalyticsPage() {
  const trend = useMemo(() => [30, 35, 33, 40, 44, 48, 52], []);
  const max = Math.max(...trend);

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <section className="card cardPad">
        <h1 className="h1">Analytics</h1>
        <div className="subtle" style={{ marginTop: 6 }}>
          Demo trends (replace with real data once backend endpoints are connected).
        </div>

        <div className="card cardPad" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 900 }}>Training minutes (7 sessions)</div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 8,
              height: 140,
              marginTop: 12,
            }}
            aria-label="Bar chart"
          >
            {trend.map((v, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: `${Math.round((v / max) * 100)}%`,
                  borderRadius: 12,
                  border: "1px solid rgba(59,130,246,0.25)",
                  background: "rgba(59,130,246,0.12)",
                }}
                title={`${v} min`}
              />
            ))}
          </div>
          <div className="subtle" style={{ fontSize: 12, marginTop: 10 }}>
            Tip: keep volume steady and increase intensity gradually.
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16 }}>
          <Metric label="Estimated 1RM (bench)" value="205 lb" hint="+5 lb (4 wks)" accent="var(--primary)" />
          <Metric label="Bodyweight (demo)" value="173 lb" hint="-1 lb (2 wks)" accent="var(--secondary)" />
        </div>
      </section>

      <section className="grid" style={{ gridTemplateRows: "auto auto 1fr" }}>
        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Recovery</div>
          <div className="subtle" style={{ marginTop: 8 }}>
            - Sleep consistency: moderate
            <br />
            - Resting HR: stable
            <br />- Suggestion: add 1 mobility session
          </div>
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>PR tracker</div>
          <div className="subtle" style={{ marginTop: 8 }}>
            Bench: 185×5 · Squat: 225×3 · Deadlift: 275×3 (demo)
          </div>
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Next focus</div>
          <div className="subtle" style={{ marginTop: 8 }}>
            Keep reps clean. Progress when you can keep 1–2 reps in reserve.
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <a className="btn btnPrimary" href="/plans">
              Update plan
            </a>
            <a className="btn" href="/log">
              Log session
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, hint, accent }) {
  return (
    <div className="card cardPad" style={{ position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-40px -40px auto auto",
          width: 120,
          height: 120,
          borderRadius: 999,
          background: accent,
          opacity: 0.08,
        }}
      />
      <div className="subtle" style={{ fontSize: 12 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>{value}</div>
      <div className="subtle" style={{ fontSize: 12, marginTop: 2 }}>
        {hint}
      </div>
    </div>
  );
}
