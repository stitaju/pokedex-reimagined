const FAVORITES_API_URL = import.meta.env.VITE_FAVORITES_API_URL;

export interface FavoriteRequest {
  id: number;
  addedBy: string;
}

export interface FavoritePokemon {
  id: number;
  addedBy: string;
  createdAt?: string;
}

export const addToFavorites = async (pokemonId: number, addedBy: string): Promise<void> => {
  const response = await fetch(`${FAVORITES_API_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: pokemonId,
      addedBy,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add to favorites');
  }
};

export const removeFromFavorites = async (pokemonId: number, addedBy: string): Promise<void> => {
  const response = await fetch(`${FAVORITES_API_URL}/api/favorites?id=${pokemonId}&addedBy=${encodeURIComponent(addedBy)}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove from favorites');
  }
};

export const getFavorites = async (addedBy: string): Promise<FavoritePokemon[]> => {
  const response = await fetch(`${FAVORITES_API_URL}/api/favorites?addedBy=${encodeURIComponent(addedBy)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }

  return response.json();
};