"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGameDetails } from "@/lib/giantbomb";
import { saveGame, removeGame, getGameData } from "@/lib/library";
import StarRating from "@/components/StarRating";

export default function GameDetailsPage() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [status, setStatus] = useState("none");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    async function load() {
      const details = await getGameDetails(id);
      setGame(details);

      const saved = getGameData(details.id);
      if (saved) {
        setIsSaved(true);
        setStatus(saved.status || "none");
        setRating(saved.rating || 0);
        setReview(saved.review || "");
      }
    }
    load();
  }, [id]);

  function handleToggleSave() {
    if (!game) return;

    if (!isSaved) {
      saveGame(game, status, rating, review);
      setIsSaved(true);
    } else {
      removeGame(game.id);
      setIsSaved(false);
    }
  }

  function handleSaveChanges() {
    if (!game) return;
    saveGame(game, status, rating, review);
    setIsSaved(true);
  }

  if (!game) return <main style={{ padding: 20 }}>Loading...</main>;

  return (
    <main style={{ padding: 20, maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>{game.name}</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <img
          src={game.image.original_url}
          alt={game.name}
          style={{
            width: "300px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        <div style={{ flex: 1, minWidth: "260px" }}>

          {/* Toggle */}
          <button
            onClick={handleToggleSave}
            style={{
              padding: "10px 15px",
              background: isSaved ? "#e63946" : "#0070f3",
              color: "white",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {isSaved ? "Remove from Library" : "Add to Library"}
          </button>

          {/* Status */}
          <label><strong>Status:</strong></label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              display: "block",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 5,
            }}
          >
            <option value="none">None</option>
            <option value="playing">🎮 Playing</option>
            <option value="wishlist">⭐ Want to Play</option>
            <option value="completed">🏆 Completed</option>
          </select>

          {/* Rating */}
          <div style={{ marginTop: 20 }}>
            <strong>Your Rating:</strong>
            <StarRating value={rating} onChange={setRating} />
          </div>

          {/* Review */}
          <div style={{ marginTop: 20 }}>
            <strong>Your Review / Notes:</strong>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your thoughts..."
              style={{
                width: "100%",
                height: "120px",
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
                marginTop: 5,
              }}
            />
          </div>

          {/* Save Changes */}
          <button
            onClick={handleSaveChanges}
            style={{
              marginTop: 15,
              padding: "10px 15px",
              background: "#4caf50",
              color: "white",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Description */}
      <section style={{ marginTop: 40 }}>
        <h2>Description</h2>
        <p style={{ lineHeight: 1.6 }}>{game.description}</p>
      </section>
    </main>
  );
}
