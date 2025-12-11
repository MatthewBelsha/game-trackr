"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const active = (path) => pathname.startsWith(path);

  return (
    <nav
  style={{
    display: "flex",
    gap: "20px",
    padding: "16px 24px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #d0d0d0",
    position: "sticky",
    top: 0,
    zIndex: 10,
  }}
>

      <Link
        href="/"
        style={{
          color: active("/") ? "#0070f3" : "#333",
          fontWeight: active("/") ? "bold" : "normal",
        }}
      >
        Home
      </Link>

      <Link
        href="/search?query="
        style={{
          color: active("/search") ? "#0070f3" : "#333",
          fontWeight: active("/search") ? "bold" : "normal",
        }}
      >
        Search
      </Link>

      <Link
        href="/library"
        style={{
          color: active("/library") ? "#0070f3" : "#333",
          fontWeight: active("/library") ? "bold" : "normal",
        }}
      >
        Library
      </Link>
    </nav>
  );
}
