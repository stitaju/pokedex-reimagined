import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  usePokemon,
  usePokemonSpecies,
} from '../hooks/usePokemon';
import { useEvolutionChain } from '../hooks/useEvolutionChain';
import { getTypeColor } from '../utils/colors';
import { getEvolutionChainIdFromUrl } from '../services/utils';
import EvolutionChain from '../components/EvolutionChain';
import FavoriteButton from '../components/FavoriteButton';
import {
  ArrowLeft,
  Ruler,
  Weight,
  Zap,
  Heart,
  Shield,
  Sword,
  Target,
  Wind,
  Sparkles,
} from 'lucide-react';

const PokemonDetail: React.FC = () => {
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
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-32"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-48"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon || !species) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">
            Pokémon not found
          </div>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Pokédex
          </Link>
        </div>
      </div>
    );
  }

  const primaryType =
    pokemon.types[0]?.type.name || 'normal';
  const primaryColor = getTypeColor(primaryType);

  const flavorText =
    species.flavor_text_entries
      .find((entry) => entry.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') ||
    'No description available.';

  const statIcons = {
    hp: Heart,
    attack: Sword,
    defense: Shield,
    'special-attack': Sparkles,
    'special-defense': Target,
    speed: Wind,
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}

      <div className="flex-1 flex flex-col scrollbar-overlay">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 px-8 py-6 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Link>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
                  {pokemon.name}
                </h1>
                <p className="text-gray-500 text-xl">
                  #{pokemon.id.toString().padStart(4, '0')}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FavoriteButton pokemonId={pokemon.id} size="lg" />
              <button className="px-4 py-2 border border-blue-600 dark:border-blue-300 text-white rounded-lg hover:bg-gray-900 transition-colors">
                Compare
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Pokemon Image and Basic Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-[125px] flex flex-col gap-8">
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm  p-8 text-center">
                  <div
                    className="w-[15rem] h-[15rem] mx-auto rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                    }}
                  >
                    <img
                      src={
                        pokemon.sprites.other[
                          'official-artwork'
                        ].front_default ||
                        pokemon.sprites.front_default
                      }
                      alt={pokemon.name}
                      className="w-72 h-w-72 object-contain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Ruler className="w-4 h-4 text-gray-400  mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                        {(pokemon.height / 10).toFixed(1)}m
                      </div>
                      <div className="text-sm text-gray-500">
                        Height
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Weight className="w-4 h-4 text-gray-400  mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-200">
                        {(pokemon.weight / 10).toFixed(1)}kg
                      </div>
                      <div className="text-sm text-gray-500">
                        Weight
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon.types.map(({ type }) => (
                      <span
                        key={type.name}
                        className="px-3 py-1 rounded-full text-white text-sm font-medium capitalize"
                        style={{
                          backgroundColor: getTypeColor(
                            type.name
                          ),
                        }}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-6">
                <p className="text-gray-700 leading-relaxed dark:text-gray-200">
                  {flavorText}
                </p>
              </div>

              {/* Evolution Chain */}
              {evolutionChain && (
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Evolution Chain
                  </h2>
                  <EvolutionChain
                    evolutionChain={evolutionChain}
                  />
                </div>
              )}

              {/* Stats */}
              <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">
                  Stats
                </h2>
                <div className="space-y-4">
                  {pokemon.stats.map(
                    ({ stat, base_stat }) => {
                      const Icon =
                        statIcons[
                          stat.name as keyof typeof statIcons
                        ] || Heart;
                      const percentage = Math.min(
                        (base_stat / 255) * 100,
                        100
                      );

                      return (
                        <div
                          key={stat.name}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex items-center space-x-3 w-32">
                            <Icon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                              {stat.name.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor:
                                  primaryColor,
                              }}
                            ></div>
                          </div>
                          <span className="font-bold text-gray-900 dark:text-gray-200 w-8 text-right text-sm">
                            {base_stat}
                          </span>
                        </div>
                      );
                    }
                  )}
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-500">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-white">
                        Total
                      </span>
                      <span className="font-bold text-gray-900 dark:text-gray-200">
                        {pokemon.stats.reduce(
                          (sum, stat) =>
                            sum + stat.base_stat,
                          0
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abilities */}
              <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200rounded-2xl shadow-sm  p-6 rounded-2xl">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Abilities
                </h2>
                <div className="space-y-3">
                  {pokemon.abilities.map(
                    ({ ability, is_hidden }) => (
                      <div
                        key={ability.name}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-lg"
                      >
                        <span className="font-medium capitalize text-gray-900 dark:text-gray-200">
                          {ability.name.replace('-', ' ')}
                        </span>
                        {is_hidden && (
                          <span className="text-xs bg-purple-100 text-purple-900 px-2 py-1 rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;