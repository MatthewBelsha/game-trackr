const API_KEY = process.env.RAWG_API_KEY;

export async function searchGames(query) {
  if (!query) return [];

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}`,
    { cache: "no-store" }
  );

  const data = await response.json();
  
  if (!data.results) return [];

  return data.results.map((game) => ({
    id: game.id,
    name: game.name,
    deck: game.slug,
    image: {
      thumb_url: game.background_image,
      original_url: game.background_image,
    },
  }));
}

export async function getGameDetails(id) {
  const res = await fetch(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`,
    { cache: "no-store" }
  );

  const game = await res.json();

  return {
    id: game.id,
    name: game.name,
    description: game.description_raw,
    image: {
      thumb_url: game.background_image,
      original_url: game.background_image,
    },
    released: game.released,
    genres: game.genres?.map((g) => g.name) || [],
    platforms:
      game.platforms?.map((p) => p.platform?.name).filter(Boolean) || [],
  };
}
