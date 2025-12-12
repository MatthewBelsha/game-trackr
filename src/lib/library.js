// Always return an array
export function getLibrary() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem("library");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Save entire library
export function saveLibrary(lib) {
  if (!Array.isArray(lib)) return;
  localStorage.setItem("library", JSON.stringify(lib));
}

// Add or update game with extra fields
export function saveGame(game, status, rating, review) {
  if (!game) return;

  const lib = getLibrary();
  const existing = lib.find((g) => g.id === game.id);

  if (existing) {
    existing.status = status;
    existing.rating = rating;
    existing.review = review;
  } else {
    lib.push({
      ...game,
      status,
      rating,
      review,
    });
  }

  saveLibrary(lib);
}

export function removeGame(id) {
  const lib = getLibrary();
  const updated = lib.filter((g) => g.id !== id);
  saveLibrary(updated);
}

export function getGameData(id) {
  const lib = getLibrary();
  return lib.find((g) => g.id === id) || null;
}
