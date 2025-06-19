const SEARCH_API_URL = import.meta.env.VITE_FAVORITES_API_URL;

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

export const searchPokemon = async (searchParams: SearchRequest): Promise<SearchResponse> => {
  const response = await fetch(`${SEARCH_API_URL}/api/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });

  if (!response.ok) {
    throw new Error('Failed to search Pokemon');
  }

  return response.json();
};

// Static data for form options
export const pokemonTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export const pokemonHabitats = [
  'cave', 'forest', 'grassland', 'mountain', 'rare',
  'rough-terrain', 'sea', 'urban', 'waters-edge'
];

export const pokemonClassifications = [
  'Seed Pokémon', 'Lizard Pokémon', 'Flame Pokémon', 'Tiny Turtle Pokémon',
  'Turtle Pokémon', 'Shellfish Pokémon', 'Worm Pokémon', 'Cocoon Pokémon',
  'Butterfly Pokémon', 'Hairy Pokémon', 'Poison Bee Pokémon', 'Tiny Bird Pokémon',
  'Bird Pokémon', 'Mouse Pokémon', 'Beak Pokémon', 'Snake Pokémon',
  'Cobra Pokémon', 'Poison Pin Pokémon', 'Drill Pokémon', 'Fairy Pokémon',
  'Fox Pokémon', 'Balloon Pokémon', 'Bat Pokémon', 'Weed Pokémon',
  'Flower Pokémon', 'Mushroom Pokémon', 'Insect Pokémon', 'Poison Moth Pokémon',
  'Mole Pokémon', 'Scratch Cat Pokémon', 'Classy Cat Pokémon', 'Duck Pokémon',
  'Pig Monkey Pokémon', 'Puppy Pokémon', 'Legendary Pokémon', 'Tadpole Pokémon',
  'Psi Pokémon', 'Superpower Pokémon', 'Flycatcher Pokémon', 'Jellyfish Pokémon',
  'Rock Pokémon', 'Megaton Pokémon', 'Fire Horse Pokémon', 'Dopey Pokémon',
  'Hermit Crab Pokémon', 'Magnet Pokémon', 'Wild Duck Pokémon', 'Twin Bird Pokémon',
  'Sea Lion Pokémon', 'Sludge Pokémon', 'Bivalve Pokémon', 'Gas Pokémon',
  'Shadow Pokémon', 'Rock Snake Pokémon', 'Hypnosis Pokémon', 'River Crab Pokémon',
  'Pincer Pokémon', 'Ball Pokémon', 'Egg Pokémon', 'Coconut Pokémon',
  'Lonely Pokémon', 'Bone Keeper Pokémon', 'Kicking Pokémon', 'Punching Pokémon',
  'Licking Pokémon', 'Poison Gas Pokémon', 'Spikes Pokémon', 'Vine Pokémon',
  'Parent Pokémon', 'Dragon Pokémon', 'Goldfish Pokémon', 'Starshape Pokémon',
  'Mysterious Pokémon', 'Barrier Pokémon', 'Mantis Pokémon', 'Humanshape Pokémon',
  'Electric Pokémon', 'Spitfire Pokémon', 'Stagbeetle Pokémon', 'Wild Bull Pokémon',
  'Fish Pokémon', 'Atrocious Pokémon', 'Transport Pokémon', 'Transform Pokémon',
  'Evolution Pokémon', 'Bubble Jet Pokémon', 'Lightning Pokémon', 'Flame Pokémon',
  'Virtual Pokémon', 'Spiral Pokémon', 'Fossil Pokémon', 'Freeze Pokémon',
  'Genetic Pokémon', 'New Species Pokémon'
];