const SEARCH_API_URL = import.meta.env
  .VITE_FAVORITES_API_URL;

export interface SearchRequest {
  searchText: string;
  types: string[];
  habitat: string[];
  classification: string;
}

export interface SearchResponse {
  results: Array<{
    id: number;
    name: string;
    url: string;
  }>;
  count: number;
}

export const searchPokemon = async (
  searchParams: SearchRequest
): Promise<SearchResponse> => {
  const response = await fetch(
    `${SEARCH_API_URL}/api/search`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to search Pokemon');
  }

  return response.json();
};

// Static data for form options
export const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export const pokemonHabitats = [
  'cave',
  'forest',
  'grassland',
  'mountain',
  'rare',
  'rough-terrain',
  'sea',
  'urban',
  'waters-edge',
];

export const pokemonClassifications = [
  'Seed Pokémon',
  'Lizard Pokémon',
  'Flame Pokémon',
  'Tiny Turtle Pokémon',
  'Turtle Pokémon',
  'Shellfish Pokémon',
  'Worm Pokémon',
  'Cocoon Pokémon',
];
