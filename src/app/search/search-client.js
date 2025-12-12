"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import { searchGames } from "@/lib/giantbomb";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function load() {
      if (!query) return;
      const games = await searchGames(query);
      setResults(games || []);
    }
    load();
  }, [query]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Search Results</h1>

      {!query && <p>Use the search bar above.</p>}
      {query && results.length === 0 && <p>No results found.</p>}

      <div
        style={{
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
