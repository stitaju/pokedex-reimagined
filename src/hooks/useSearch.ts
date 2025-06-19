import { useQuery } from '@tanstack/react-query';
import { searchPokemon } from '../services/searchService';
import type { SearchRequest, SearchResponse } from '../services/searchService';

export const useSearch = (searchParams: SearchRequest, enabled: boolean = false) => {
  return useQuery<SearchResponse>({
    queryKey: ['search', searchParams],
    queryFn: () => searchPokemon(searchParams),
    enabled: enabled && (
      searchParams.searchText.trim() !== '' ||
      searchParams.types.length > 0 ||
      searchParams.habitat.length > 0 ||
      searchParams.classification !== ''
    ),
    staleTime: 30 * 1000, // 30 seconds
  });
};