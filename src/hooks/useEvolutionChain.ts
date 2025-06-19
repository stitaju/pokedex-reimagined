import { useQuery } from '@tanstack/react-query';
import { fetchEvolutionChain } from '../services/pokemonService';
import type { EvolutionChain } from '../types/pokemon';

export const useEvolutionChain = (id: string | number) => {
  return useQuery<EvolutionChain>({
    queryKey: ['evolutionChain', id],
    queryFn: () => fetchEvolutionChain(id),
    enabled: !!id,
  });
};
