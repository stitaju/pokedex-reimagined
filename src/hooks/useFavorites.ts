import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites, getFavorites } from '../services/favoritesService';
import type { FavoritePokemon } from '../services/favoritesService';

const USER_NAME = 'Sirish Titaju'; // You can make this dynamic later

export const useFavorites = () => {
  return useQuery<FavoritePokemon[]>({
    queryKey: ['favorites', USER_NAME],
    queryFn: () => getFavorites(USER_NAME),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pokemonId: number) => addToFavorites(pokemonId, USER_NAME),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', USER_NAME] });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pokemonId: number) => removeFromFavorites(pokemonId, USER_NAME),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites', USER_NAME] });
    },
  });
};

export const useIsFavorite = (pokemonId: number) => {
  const { data: favorites = [] } = useFavorites();
  return favorites.some(fav => fav.id === pokemonId);
};