import React from 'react';
import { Ruler, Weight } from 'lucide-react';
import { getTypeColor } from '../../utils/colors';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
    front_default: string;
  };
}

interface PokemonDetailLeftColumnProps {
  pokemon: Pokemon;
  flavorText: string;
  primaryColor: string;
}

const PokemonDetailLeftColumn: React.FC<
  PokemonDetailLeftColumnProps
> = ({ pokemon, flavorText, primaryColor }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-[125px] flex flex-col gap-8">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 border-gray-200 rounded-2xl shadow-sm p-8 text-center">
          <div
            className="w-[15rem] h-[15rem] mx-auto rounded-full flex items-center justify-center mb-6"
            style={{
              backgroundColor: `${primaryColor}15`,
            }}
          >
            <img
              src={
                pokemon.sprites.other['official-artwork']
                  .front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-72 h-w-72 object-contain"
            />
          </div>
          <p className="text-gray-700 leading-relaxed dark:text-gray-200 mb-5">
            {flavorText}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Ruler className="w-4 h-4 text-gray-400 mr-1" />
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
                <Weight className="w-4 h-4 text-gray-400 mr-1" />
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
                  backgroundColor: getTypeColor(type.name),
                }}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailLeftColumn;
