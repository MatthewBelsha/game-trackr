import { searchGames } from "@/lib/giantbomb";
import GameCard from "@/components/GameCard";

export default async function SearchPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const results = query ? await searchGames(query) : [];

  return (
    <main>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Search Results</h1>

      {query === "" && <p>Use the search bar above.</p>}

      {query !== "" && results.length === 0 && <p>No games found.</p>}

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "20px",
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
