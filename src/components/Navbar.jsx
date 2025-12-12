"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px 20px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "#333" }}>
        Home
      </Link>

      <Link href="/library" style={{ textDecoration: "none", color: "#333" }}>
        Library
      </Link>

      <Link href="/suggested" style={{ textDecoration: "none", color: "#333" }}>
        Suggested
      </Link>
    </nav>
  );
}
