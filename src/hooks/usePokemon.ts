import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemon,
  fetchPokemonSpecies,
} from '../services/pokemonService';
import type {
  Pokemon,
  PokemonSpecies,
} from '../types/pokemon';

export const usePokemon = (nameOrId: string | number) => {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemon(nameOrId),
    enabled: !!nameOrId,
  });
};

export const usePokemonSpecies = (
  nameOrId: string | number
) => {
  return useQuery<PokemonSpecies>({
    queryKey: ['pokemonSpecies', nameOrId],
    queryFn: () => fetchPokemonSpecies(nameOrId),
    enabled: !!nameOrId,
  });
};
