import Link from "next/link";

export default function GameCard({ game }) {
  const thumb = game.image?.thumb_url || "https://placehold.co/300x400";

  return (
    <Link href={`/game/${game.id}`} style={{ textDecoration: "none" }}>
      <div
  style={{
    border: "1px solid #ccc",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "12px",
    transition: "0.2s",
  }}
>

        <img
          src={thumb}
          alt={game.name}
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
        <h2 style={{ marginTop: "10px", fontSize: "18px", color: "#333" }}>
          {game.name}
        </h2>
      </div>
    </Link>
  );
}
