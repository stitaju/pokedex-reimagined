import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokemonService';
import type { PokemonListResponse } from '../types/pokemon';

export const usePokemonList = (limit: number = 20) => {
  return useInfiniteQuery<PokemonListResponse>({
    queryKey: ['pokemonList', limit],
    queryFn: ({ pageParam = 0 }) =>
      fetchPokemonList(limit, pageParam as number),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined;
      return pages.length * limit;
    },
    initialPageParam: 0,
  });
};
