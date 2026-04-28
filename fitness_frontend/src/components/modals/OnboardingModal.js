import React, { useMemo, useState } from "react";
import Modal from "./Modal";

/**
 * PUBLIC_INTERFACE
 * First-time onboarding modal to collect lightweight preferences (stored locally).
 */
export default function OnboardingModal({ onClose, onOpenChat }) {
  const [goal, setGoal] = useState("Strength");
  const [days, setDays] = useState(4);
  const [minutes, setMinutes] = useState(45);

  const summary = useMemo(() => {
    return `${goal} · ${days} days/wk · ${minutes} min/session`;
  }, [goal, days, minutes]);

  return (
    <Modal
      open={true}
      title="Welcome to FitTrack"
      onClose={onClose}
      footer={
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button className="btn" onClick={onOpenChat} type="button">
            Ask coach
          </button>
          <button className="btn btnPrimary" onClick={onClose} type="button">
            Finish setup
          </button>
        </div>
      }
    >
      <p className="subtle" style={{ marginTop: 0 }}>
        Quick setup to tailor your dashboard. You can adjust anytime in Settings.
      </p>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card cardPad">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Primary goal</div>
          <select
            className="input"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option>Strength</option>
            <option>Fat loss</option>
            <option>Endurance</option>
            <option>Mobility</option>
          </select>
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Days per week</div>
          <input
            className="input"
            type="number"
            min={1}
            max={7}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            Minutes per session
          </div>
          <input
            className="input"
            type="number"
            min={10}
            max={180}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </div>

        <div className="card cardPad">
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Plan summary</div>
          <div className="pill">
            <span aria-hidden="true">✨</span>
            <span>{summary}</span>
          </div>
          <div className="subtle" style={{ fontSize: 12, marginTop: 8 }}>
            This demo stores preferences locally; backend integration can replace
            this later.
          </div>
        </div>
      </div>
    </Modal>
  );
}
