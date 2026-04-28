import React, { useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Workout plans page (demo), showing a weekly split and plan details.
 */
export default function PlansPage() {
  const initial = useMemo(
    () => [
      { day: "Mon", focus: "Upper Strength", lifts: ["Bench", "Row", "OHP"] },
      { day: "Tue", focus: "Zone 2 Cardio", lifts: ["Bike 35–45 min"] },
      { day: "Thu", focus: "Lower Strength", lifts: ["Squat", "RDL", "Lunges"] },
      { day: "Sat", focus: "Accessory + Mobility", lifts: ["Pull-ups", "Curls", "Hip mobility"] },
    ],
    []
  );

  const [plan, setPlan] = useState(initial);

  const updateFocus = (idx, focus) => {
    setPlan((p) => p.map((it, i) => (i === idx ? { ...it, focus } : it)));
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
      <section className="card cardPad">
        <h1 className="h1">Your weekly plan</h1>
        <div className="subtle" style={{ marginTop: 6 }}>
          Edit the focus areas. This demo is stored in-memory only.
        </div>

        <div className="grid" style={{ marginTop: 14 }}>
          {plan.map((p, idx) => (
            <div key={`${p.day}-${idx}`} className="card cardPad">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div className="pill">
                  <span aria-hidden="true">📅</span>
                  <b>{p.day}</b>
                </div>
                <a className="btn btnPrimary" href="/log">
                  Log
                </a>
              </div>

              <div style={{ marginTop: 10, fontWeight: 900 }}>Focus</div>
              <input
                className="input"
                value={p.focus}
                onChange={(e) => updateFocus(idx, e.target.value)}
                aria-label={`${p.day} focus`}
                style={{ marginTop: 6 }}
              />

              <div className="subtle" style={{ marginTop: 10, fontSize: 12 }}>
                Suggested
              </div>
              <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                {p.lifts.map((l) => (
                  <li key={l} style={{ marginTop: 4 }}>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="grid" style={{ gridTemplateRows: "auto auto 1fr" }}>
        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Plan rules</div>
          <div className="subtle" style={{ marginTop: 8 }}>
            - Progressive overload: add 2.5–5 lbs when reps are solid
            <br />
            - Keep 1–2 reps in reserve for compounds most weeks
            <br />- Deload every 4–6 weeks
          </div>
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Nutrition note</div>
          <div className="subtle" style={{ marginTop: 8 }}>
            Prioritize protein and a steady caloric approach aligned with your goal.
          </div>
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 900 }}>Export</div>
          <div className="subtle" style={{ marginTop: 8 }}>
            Backend export can be added later. For now, copy your focus fields into notes.
          </div>
          <div style={{ marginTop: 12 }}>
            <pre
              style={{
                margin: 0,
                padding: 12,
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.6)",
                whiteSpace: "pre-wrap",
              }}
            >
              {plan.map((p) => `${p.day}: ${p.focus}`).join("\n")}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
