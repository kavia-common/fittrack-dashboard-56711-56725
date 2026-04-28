import React, { useMemo } from "react";

/**
 * PUBLIC_INTERFACE
 * Overview dashboard page with summary cards and quick actions.
 */
export default function OverviewPage() {
  const nextWorkout = useMemo(
    () => ({
      title: "Upper Body Strength",
      items: ["Bench Press 4×6", "Row 4×8", "Overhead Press 3×8", "Pull-ups 3×AMRAP"],
      eta: "Today · 45 min",
    }),
    []
  );

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
      <section className="card cardPad">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <h1 className="h1">Your day at a glance</h1>
            <div className="subtle" style={{ marginTop: 6 }}>
              Consistency beats intensity. Track the small wins.
            </div>
          </div>
          <div className="pill" title="Demo">
            <span aria-hidden="true">🔥</span>
            <span>
              Readiness: <b>Good</b>
            </span>
          </div>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 16 }}
        >
          <StatCard label="Workouts" value="3" hint="This week" accent="var(--primary)" />
          <StatCard label="Volume" value="14.2k" hint="lbs moved" accent="var(--secondary)" />
          <StatCard label="Sleep" value="7h 18m" hint="avg (demo)" accent="var(--success)" />
        </div>

        <div className="card cardPad" style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 900 }}>Next workout</div>
          <div className="subtle" style={{ marginTop: 4 }}>
            {nextWorkout.eta}
          </div>
          <div style={{ marginTop: 10, fontWeight: 800 }}>{nextWorkout.title}</div>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
            {nextWorkout.items.map((it) => (
              <li key={it} style={{ marginTop: 4 }}>
                {it}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <a className="btn btnPrimary" href="/log">
              Log it now
            </a>
            <a className="btn" href="/plans">
              View plan
            </a>
          </div>
        </div>
      </section>

      <section className="grid" style={{ gridTemplateRows: "auto auto 1fr" }}>
        <div className="card cardPad">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 900 }}>Weekly goal</div>
              <div className="subtle" style={{ marginTop: 4 }}>
                4 workouts · 180 minutes
              </div>
            </div>
            <div className="pill" style={{ borderColor: "rgba(16,185,129,0.25)" }}>
              <span aria-hidden="true">✅</span>
              <span>On track</span>
            </div>
          </div>

          <ProgressBar value={0.75} />
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Insights</div>
          <div className="subtle" style={{ marginTop: 6 }}>
            - Strength trend: up 3% (4 weeks)
            <br />
            - Recovery: prioritize sleep 2 nights this week
            <br />- Consider a deload in ~2 weeks
          </div>
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Quick actions</div>
          <div className="grid" style={{ marginTop: 10 }}>
            <a className="btn btnSuccess" href="/log">
              Log a workout
            </a>
            <a className="btn" href="/analytics">
              View analytics
            </a>
            <a className="btn" href="/settings">
              Adjust goals
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, hint, accent }) {
  return (
    <div
      className="card cardPad"
      style={{
        borderColor: "rgba(229,231,235,1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "auto -40px -50px auto",
          width: 140,
          height: 140,
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

function ProgressBar({ value }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100);
  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          height: 10,
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: "rgba(255,255,255,0.6)",
          overflow: "hidden",
        }}
        aria-label={`Progress ${pct}%`}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, rgba(59,130,246,0.75), rgba(16,185,129,0.65))",
          }}
        />
      </div>
      <div className="subtle" style={{ fontSize: 12, marginTop: 8 }}>
        {pct}% complete
      </div>
    </div>
  );
}
