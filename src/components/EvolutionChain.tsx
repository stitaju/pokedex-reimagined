import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { getPokemonIdFromUrl } from '../services/utils';
import { getTypeColor } from '../utils/colors';
import { ArrowRight } from 'lucide-react';
import type {
  EvolutionChain,
  EvolutionLink,
} from '../types/pokemon';

interface EvolutionChainProps {
  evolutionChain: EvolutionChain;
}

interface EvolutionNodeProps {
  evolution: EvolutionLink;
  isLast?: boolean;
}

const EvolutionNode: React.FC<EvolutionNodeProps> = ({
  evolution,
  isLast = false,
}) => {
  const pokemonId = getPokemonIdFromUrl(
    evolution.species.url
  );
  const { data: pokemon, isLoading } =
    usePokemon(pokemonId);

  if (isLoading || !pokemon) {
    return (
      <div className="flex items-center">
        <div className="bg-gray-100 rounded-xl p-3 w-24 h-28 animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-12"></div>
        </div>
        {!isLast && (
          <ArrowRight className="w-5 h-5 text-gray-400 mx-3" />
        )}
      </div>
    );
  }

  const primaryType =
    pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getTypeColor(primaryType);

  return (
    <div className="flex items-center">
      <Link
        to={`/pokemon/${pokemon.id}`}
        className="group transform transition-all duration-200 hover:scale-105"
      >
        <div className="bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-xl p-3 hover:bg-gray-100 transition-colors w-auto text-center">
          <div
            className="w-32 h-32 rounded-lg flex items-center justify-center mb-2 mx-auto"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <img
              src={
                pokemon.sprites.other['official-artwork']
                  .front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          <div className="text-xs font-medium text-gray-900 dark:text-gray-100 capitalize truncate">
            {pokemon.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-300">
            Lv.{' '}
            {evolution.evolution_details[0]?.min_level ||
              '?'}
          </div>
        </div>
      </Link>

      {!isLast && evolution.evolves_to.length > 0 && (
        <ArrowRight className="w-5 h-5 text-gray-400 mx-3" />
      )}
    </div>
  );
};

const renderEvolutionStage = (
  evolution: EvolutionLink,
  depth: number = 0
): React.ReactElement => {
  return (
    <div
      key={`${evolution.species.name}-${depth}`}
      className="flex items-center flex-wrap gap-3"
    >
      <EvolutionNode
        evolution={evolution}
        isLast={evolution.evolves_to.length === 0}
      />

      {evolution.evolves_to.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {evolution.evolves_to.map(
            (nextEvolution, index) => (
              <div
                key={`${nextEvolution.species.name}-${index}`}
              >
                {renderEvolutionStage(
                  nextEvolution,
                  depth + 1
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

const EvolutionChain: React.FC<EvolutionChainProps> = ({
  evolutionChain,
}) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-max py-2">
        {renderEvolutionStage(evolutionChain.chain)}
      </div>
    </div>
  );
};

export default EvolutionChain;
