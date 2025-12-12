"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchGames } from "@/lib/giantbomb";
import GameCard from "@/components/GameCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState([]);

  useEffect(() => {
    async function run() {
      if (!query) {
        setResults([]);
        return;
      }

      const games = await searchGames(query);
      setResults(games);
    }

    run();
  }, [query]);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Search Results</h1>

      {!query && <p>Use the search bar above.</p>}
      {query && results.length === 0 && <p>No games found.</p>}

      <div
        style={{
          marginTop: 20,
          display: "grid",
          gap: 20,
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {results.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </main>
  );
}
