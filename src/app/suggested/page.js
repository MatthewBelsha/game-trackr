"use client";

import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";

export default function SuggestedPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://api.rawg.io/api/games?ordering=-rating&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );

      const data = await res.json();

      // Transform RAWG data → GameCard-compatible structure
      const mapped = (data.results || []).map((g) => ({
        id: g.id,
        name: g.name,
        image: {
          thumb_url: g.background_image || "https://placehold.co/300x400",
        },
      }));

      setGames(mapped);
    }

    load();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Suggested Games</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        Popular and highly-rated games recommended for you.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
