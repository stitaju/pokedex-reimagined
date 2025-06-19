import React from 'react';
import { useParams } from 'react-router-dom';
import {
  usePokemon,
  usePokemonSpecies,
} from '../hooks/usePokemon';
import { useEvolutionChain } from '../hooks/useEvolutionChain';
import { getTypeColor } from '../utils/colors';
import { getEvolutionChainIdFromUrl } from '../utils/utils';
import PokemonDetailHeader from '../components/PokemonDetail/PokemonDetailHeader';
import PokemonDetailLeftColumn from '../components/PokemonDetail/PokemonDetailLeftColumn';
import PokemonDetailRightColumn from '../components/PokemonDetail/PokemonDetailRightColumn';
import PokemonDetailLoading from '../components/PokemonDetail/PokemonDetailLoading';
import PokemonDetailError from '../components/PokemonDetail/PokemonDetailError';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pokemon, isLoading: pokemonLoading } =
    usePokemon(id!);
  const { data: species, isLoading: speciesLoading } =
    usePokemonSpecies(id!);

  const evolutionChainId = species
    ? getEvolutionChainIdFromUrl(
        species.evolution_chain.url
      )
    : null;
  const { data: evolutionChain } = useEvolutionChain(
    evolutionChainId!
  );

  if (pokemonLoading || speciesLoading) {
    return <PokemonDetailLoading />;
  }

  if (!pokemon || !species) {
    return <PokemonDetailError />;
  }

  const primaryType =
    pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getTypeColor(primaryType);

  const flavorText =
    species.flavor_text_entries
      .find((entry) => entry.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') ||
    'No description available.';

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col scrollbar-overlay">
        <PokemonDetailHeader
          pokemonId={pokemon.id}
          pokemonName={pokemon.name}
        />

        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PokemonDetailLeftColumn
              pokemon={pokemon}
              flavorText={flavorText}
              primaryColor={primaryColor}
            />

            <PokemonDetailRightColumn
              pokemon={pokemon}
              evolutionChain={evolutionChain}
              primaryColor={primaryColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
