"use client";

import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import { searchGames } from "@/lib/giantbomb"; // or RAWG version

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Read ?query from URL manually (avoids Suspense requirement)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("query") || "";
    setQuery(q);

    async function load() {
      if (!q) return;
      const games = await searchGames(q);
      setResults(games || []);
    }

    load();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Search Results
      </h1>

      {!query && <p>Use the search bar above.</p>}
      {query && results.length === 0 && <p>No results found.</p>}

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
