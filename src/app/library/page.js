"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LibraryPage() {
  const [games, setGames] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("library") || "{}");
    setGames(saved);
  }, []);

  const list = Object.values(games); // Array of saved game objects

  return (
    <main>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        My Library
      </h1>

      {list.length === 0 && (
        <p style={{ fontSize: "16px", color: "#666" }}>
          No games saved yet.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {list.map((g) => (
          <Link key={g.id} href={`/game/${g.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
              }}
            >
              <img
                src={
                  g.image?.thumb_url ||
                  g.image?.original_url ||
                  "https://placehold.co/300x400"
                }
                alt={g.name}
                style={{
                  width: "100%",
                  height: "240px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{g.name}</h3>

              <p style={{ fontSize: "14px", color: "#666" }}>
                Status: {g.status || "Not set"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
