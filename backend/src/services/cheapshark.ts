import type { CheapSharkGame } from "../types/cheapshark";

const BASE_URL = "https://www.cheapshark.com/api/1.0";

const CACHE_TTL_MS = 10 * 60 * 1000;
type CacheEntry = {
  games: CheapSharkGame[];
  expiresAt: number;
};
const searchCache = new Map<string, CacheEntry>();

export async function searchGames(title: string): Promise<CheapSharkGame[]> {
  const key = title.trim().toLowerCase();

  const cached = searchCache.get(key);

  if (cached !== undefined && cached.expiresAt > Date.now()) {
    return cached.games;
  }

  const url = `${BASE_URL}/games?title=${encodeURIComponent(title)}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "CacadorDePromocoes/1.0.0 (https://github.com/VitorMarquezz/cacador-de-promocoes)",
    },
  });

  if (!response.ok) {
    throw new Error(`CheapShark respondeu com status: ${response.status}`);
  }

  const games: CheapSharkGame[] = await response.json();

  searchCache.set(key, { games, expiresAt: Date.now() + CACHE_TTL_MS });

  return games;
}
