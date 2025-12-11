"use client";

import { useState, useEffect } from "react";

export default function StatusSelector({ game }) {
  const [status, setStatus] = useState("");

  // Load saved status on mount
  useEffect(() => {
    const library = JSON.parse(localStorage.getItem("library") || "{}");
    const saved = library[game.id];
    if (saved && saved.status) {
      setStatus(saved.status);
    }
  }, [game.id]);

  // Update LocalStorage whenever status changes
  const updateStatus = (value) => {
    setStatus(value);

    const library = JSON.parse(localStorage.getItem("library") || "{}");

    library[game.id] = {
      ...game,
      status: value,
    };

    localStorage.setItem("library", JSON.stringify(library));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <label style={{ fontWeight: "bold" }}>Status: </label>

      <select
        value={status}
        onChange={(e) => updateStatus(e.target.value)}
        style={{
          padding: "6px 12px",
          marginLeft: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">Not Set</option>
        <option value="Want to Play">Want to Play</option>
        <option value="Playing">Playing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
