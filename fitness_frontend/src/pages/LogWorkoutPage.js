import React, { useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Workout logging page (demo) with sets/reps/weight input.
 */
export default function LogWorkoutPage() {
  const [title, setTitle] = useState("Upper Body Strength");
  const [notes, setNotes] = useState("");
  const [sets, setSets] = useState(() => [
    { lift: "Bench Press", sets: 4, reps: 6, weight: 135 },
    { lift: "Row", sets: 4, reps: 8, weight: 115 },
    { lift: "Overhead Press", sets: 3, reps: 8, weight: 75 },
  ]);
  const [history, setHistory] = useState([]);

  const totalVolume = useMemo(() => {
    return sets.reduce((sum, s) => sum + s.sets * s.reps * s.weight, 0);
  }, [sets]);

  const updateRow = (idx, patch) => {
    setSets((rows) => rows.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    setSets((rows) => [...rows, { lift: "New lift", sets: 3, reps: 10, weight: 0 }]);
  };

  const submit = () => {
    const entry = {
      id: String(Date.now()),
      title,
      notes,
      date: new Date().toLocaleString(),
      totalVolume,
      sets: sets.map((s) => ({ ...s })),
    };
    setHistory((h) => [entry, ...h]);
    setNotes("");
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: "1.15fr 0.85fr" }}>
      <section className="card cardPad">
        <h1 className="h1">Log a workout</h1>
        <div className="subtle" style={{ marginTop: 6 }}>
          Structured logging improves progressive overload and insight quality.
        </div>

        <div className="grid" style={{ marginTop: 14, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Workout title</div>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Workout title"
            />
          </div>
          <div>
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Estimated volume</div>
            <div className="pill" style={{ justifyContent: "space-between" }}>
              <span aria-hidden="true">🏋️</span>
              <span>
                <b>{Math.round(totalVolume).toLocaleString()}</b> lb·reps
              </span>
            </div>
          </div>
        </div>

        <div className="card cardPad" style={{ marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div style={{ fontWeight: 900 }}>Lifts</div>
            <button className="btn" onClick={addRow} type="button">
              Add lift
            </button>
          </div>

          <div style={{ overflowX: "auto", marginTop: 10 }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--muted)", fontSize: 12 }}>
                  <th>Lift</th>
                  <th>Sets</th>
                  <th>Reps</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {sets.map((s, idx) => (
                  <tr key={`${s.lift}-${idx}`}>
                    <td style={{ paddingRight: 10 }}>
                      <input
                        className="input"
                        value={s.lift}
                        onChange={(e) => updateRow(idx, { lift: e.target.value })}
                        aria-label={`Lift ${idx + 1} name`}
                      />
                    </td>
                    <td style={{ width: 90, paddingRight: 10 }}>
                      <input
                        className="input"
                        type="number"
                        min={1}
                        value={s.sets}
                        onChange={(e) => updateRow(idx, { sets: Number(e.target.value) })}
                        aria-label={`Lift ${idx + 1} sets`}
                      />
                    </td>
                    <td style={{ width: 90, paddingRight: 10 }}>
                      <input
                        className="input"
                        type="number"
                        min={1}
                        value={s.reps}
                        onChange={(e) => updateRow(idx, { reps: Number(e.target.value) })}
                        aria-label={`Lift ${idx + 1} reps`}
                      />
                    </td>
                    <td style={{ width: 120 }}>
                      <input
                        className="input"
                        type="number"
                        min={0}
                        value={s.weight}
                        onChange={(e) => updateRow(idx, { weight: Number(e.target.value) })}
                        aria-label={`Lift ${idx + 1} weight`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 10, fontWeight: 900 }}>Notes</div>
          <textarea
            className="input"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Energy, cues, pain notes, adjustments…"
            aria-label="Workout notes"
            style={{ marginTop: 6, resize: "vertical" }}
          />

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}>
            <button className="btn btnPrimary" onClick={submit} type="button">
              Save entry
            </button>
          </div>
        </div>
      </section>

      <section className="card cardPad">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 900 }}>Recent entries</div>
            <div className="subtle" style={{ marginTop: 4 }}>
              Stored in-memory for this demo session.
            </div>
          </div>
          <div className="pill">
            <span aria-hidden="true">🕒</span>
            <span>{history.length}</span>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          {history.length === 0 ? (
            <div className="subtle">No entries yet. Save one to see it here.</div>
          ) : (
            history.map((h) => (
              <div key={h.id} className="card cardPad">
                <div style={{ fontWeight: 900 }}>{h.title}</div>
                <div className="subtle" style={{ fontSize: 12, marginTop: 4 }}>
                  {h.date} · {Math.round(h.totalVolume).toLocaleString()} lb·reps
                </div>
                {h.notes ? (
                  <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{h.notes}</div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
