import { getGameDetails } from "@/lib/giantbomb";
import AddToLibrary from "@/components/AddToLibrary";
import StatusSelector from "@/components/StatusSelector";

export default async function GameDetailsPage(props) {
  const params = await props.params;
  const id = params.id;

  const game = await getGameDetails(id);

  return (
    <main style={{ padding: 20 }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>{game.name}</h1>

      {/* Two-column layout */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* IMAGE */}
        <img
          src={game.image.original_url}
          alt={game.name}
          style={{
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        {/* DETAILS */}
        <div>
          {game.released && (
            <p><strong>Release Date:</strong> {game.released}</p>
          )}

          {game.genres.length > 0 && (
            <p><strong>Genres:</strong> {game.genres.join(", ")}</p>
          )}

          {game.platforms.length > 0 && (
            <p><strong>Platforms:</strong> {game.platforms.join(", ")}</p>
          )}

          <AddToLibrary game={game} />
          <StatusSelector game={game} />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Description</h2>
        <p style={{ lineHeight: 1.6, marginTop: "10px" }}>
          {game.description}
        </p>
      </div>
    </main>
  );
}
