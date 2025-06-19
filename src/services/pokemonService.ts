import { apiFetch } from './pokemonApi';

export const fetchPokemonList = (
  limit: number = 20,
  offset: number = 0
) => apiFetch(`/pokemon?limit=${limit}&offset=${offset}`);

export const fetchPokemon = (nameOrId: string | number) =>
  apiFetch(`/pokemon/${nameOrId}`);

export const fetchPokemonSpecies = (
  nameOrId: string | number
) => apiFetch(`/pokemon-species/${nameOrId}`);

export const fetchEvolutionChain = (id: string | number) =>
  apiFetch(`/evolution-chain/${id}`);

export const fetchMove = (nameOrId: string | number) =>
  apiFetch(`/move/${nameOrId}`);

export const fetchPokemonType = (name: string) =>
  apiFetch(`/type/${name}`);
