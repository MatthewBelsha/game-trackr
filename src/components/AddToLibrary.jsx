"use client";

import { useEffect, useState } from "react";

export default function AddToLibrary({ game }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const library = JSON.parse(localStorage.getItem("library") || "{}");
    if (library[game.id]) {
      setSaved(true);
    }
  }, [game.id]);

  const toggleSave = () => {
    const library = JSON.parse(localStorage.getItem("library") || "{}");

    if (saved) {
      // Remove from library
      delete library[game.id];
      setSaved(false);
    } else {
      // Add to library
      library[game.id] = {
        ...game,
        status: game.status || "",
        notes: game.notes || "",
      };
      setSaved(true);
    }

    localStorage.setItem("library", JSON.stringify(library));
  };

  return (
    <button
      onClick={toggleSave}
      style={{
        padding: "10px 18px",
        backgroundColor: saved ? "#942222ff" : "#4caf50",
        color: "white",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      {saved ? "Remove from Library" : "Add to Library"}
    </button>
  );
}
