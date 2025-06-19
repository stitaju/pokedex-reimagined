export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      home: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }>;
  }>;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
    version: {
      name: string;
    };
  }>;
  genera: Array<{
    genus: string;
    language: {
      name: string;
    };
  }>;
  habitat: {
    name: string;
    url: string;
  } | null;
  evolution_chain: {
    url: string;
  };
  color: {
    name: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionLink;
}

export interface EvolutionLink {
  is_baby: boolean;
  species: {
    name: string;
    url: string;
  };
  evolution_details: Array<{
    gender: number | null;
    held_item: any | null;
    item: any | null;
    known_move: any | null;
    known_move_type: any | null;
    location: any | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: any | null;
    party_type: any | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: any | null;
    trigger: {
      name: string;
      url: string;
    };
    turn_upside_down: boolean;
  }>;
  evolves_to: EvolutionLink[];
}

export interface Move {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  pp: number;
  priority: number;
  power: number | null;
  damage_class: {
    name: string;
    url: string;
  };
  effect_entries: Array<{
    effect: string;
    language: {
      name: string;
    };
    short_effect: string;
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }>;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }>;
}