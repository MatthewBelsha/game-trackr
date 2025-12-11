"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const submit = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(term)}`);
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for a game..."
        style={{
          padding: "10px",
          width: "70%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 15px",
          marginLeft: "10px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}
