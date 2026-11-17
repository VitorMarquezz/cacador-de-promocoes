import type { CheapSharkGame } from "../types/cheapshark"

const BASE_URL = "https://www.cheapshark.com/api/1.0"

export async function searchGames(title: string): Promise<CheapSharkGame[]>{
    const url = `${BASE_URL}/games?title=${encodeURIComponent(title)}`

    const response = await fetch(url, {
        headers: {
            "User-Agent": "CacadorDePromocoes/1.0.0 (https://github.com/VitorMarquezz/cacador-de-promocoes)"
        }
    })

    if(!response.ok) {
        throw new Error(`CheapShark respondeu com status: ${response.status}`)
    }
    
    return await response.json()
}