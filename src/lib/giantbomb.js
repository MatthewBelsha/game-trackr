export async function searchGames(query) {
  const url = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  return (data.results || []).map((g) => ({
    id: g.id,
    name: g.name,
    image: {
      thumb_url: g.background_image || "https://placehold.co/300x400",
      original_url: g.background_image || "https://placehold.co/600x800",
    },
    genres: g.genres?.map((gen) => gen.name) || [],
    platforms: g.platforms?.map((p) => p.platform.name) || [],
    description: "", // RAWG search does NOT include description
    released: g.released || "Unknown",
  }));
}

export async function getGameDetails(id) {
  const url = `https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;

  const res = await fetch(url);
  const g = await res.json();

  return {
    id: g.id,
    name: g.name,
    image: {
      thumb_url: g.background_image || "https://placehold.co/300x400",
      original_url: g.background_image || "https://placehold.co/600x800",
    },
    genres: g.genres?.map((gen) => gen.name) || [],
    platforms: g.platforms?.map((p) => p.platform.name) || [],
    description: g.description_raw || "No description provided.",
    released: g.released || "Unknown",
  };
}
