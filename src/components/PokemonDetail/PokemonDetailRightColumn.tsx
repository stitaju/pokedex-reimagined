import React from 'react';
import {
  Heart,
  Shield,
  Sword,
  Target,
  Wind,
  Sparkles,
} from 'lucide-react';
import EvolutionChain from './EvolutionChain';

interface Pokemon {
  stats: Array<{
    stat: { name: string };
    base_stat: number;
  }>;
  abilities: Array<{
    ability: { name: string };
    is_hidden: boolean;
  }>;
}

interface EvolutionChainType {
  // Add proper typing based on your evolution chain structure
  [key: string]: any;
}

interface PokemonDetailRightColumnProps {
  pokemon: Pokemon;
  evolutionChain: EvolutionChainType | any;
  primaryColor: string;
}

const PokemonDetailRightColumn: React.FC<
  PokemonDetailRightColumnProps
> = ({ pokemon, evolutionChain, primaryColor }) => {
  const statIcons = {
    hp: Heart,
    attack: Sword,
    defense: Shield,
    'special-attack': Sparkles,
    'special-defense': Target,
    speed: Wind,
  };

  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Evolution Chain */}
      {evolutionChain && (
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Evolution Chain
          </h2>
          <EvolutionChain evolutionChain={evolutionChain} />
        </div>
      )}

      {/* Stats */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 dark:text-white">
          Stats
        </h2>
        <div className="space-y-4">
          {pokemon.stats.map(({ stat, base_stat }) => {
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
                  <Icon className="w-6 h-6 text-gray-400" />
                  <span className="text-md font-medium text-gray-700 dark:text-gray-200 capitalize">
                    {stat.name.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="h-[100%] rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: primaryColor,
                    }}
                  ></div>
                </div>
                <span className="font-bold text-gray-900 dark:text-gray-200 w-8 text-right text-md">
                  {base_stat}
                </span>
              </div>
            );
          })}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-500">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-white">
                Total
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-200">
                {pokemon.stats.reduce(
                  (sum, stat) => sum + stat.base_stat,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Abilities */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-6">
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
  );
};

export default PokemonDetailRightColumn;
