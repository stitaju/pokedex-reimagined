import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { getTypeColor } from '../utils/colors';
import { Ruler, Weight } from 'lucide-react';

interface PokemonCardProps {
  name: string;
  id: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  id,
}) => {
  const { data: pokemon, error } = usePokemon(id);

  if (error || !pokemon) {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-sm border border-gray-100 dark-border-gray-700 text-center">
        <div className="text-gray-500 mb-2 text-sm">
          Loading...
        </div>
        <div className="text-gray-500 text-sm capitalize">
          {name}
        </div>
      </div>
    );
  }

  const primaryType =
    pokemon.types[0]?.type.name || 'normal';
  const backgroundColor = getTypeColor(primaryType);

  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className="group block transform transition-all duration-200 hover:scale-[105%]"
    >
      <div
        className={`rounded-xl shadow-sm border border-${backgroundColor}-100 dark:border-gray-700 hover:shadow-md`}
      >
        <div
          className="p-4 relative"
          style={{
            backgroundColor: `${backgroundColor}15`,
          }}
        >
          <div className="absolute top-2 right-0 z-[-1]">
            <span className="text-[6rem] font-medium text-gray-300 dark:text-gray-700 opacity-30">
              #{pokemon.id.toString().padStart(4, '0')}
            </span>
          </div>

          <div className="flex items-center justify-center h-[7.5rem]">
            <img
              src={
                pokemon.sprites.other['official-artwork']
                  .front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="w-[15rem] h-[15rem] object-contain group-hover:scale-110 transition-transform duration-200"
              loading="lazy"
            />
          </div>
        </div>

        <div className="p-4 mt-3">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 capitalize mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {pokemon.name}
          </h3>

          <div className="flex flex-wrap gap-1">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="px-2 py-1 rounded-full text-white text-sm font-medium capitalize"
                style={{
                  backgroundColor: getTypeColor(type.name),
                }}
              >
                {type.name}
              </span>
            ))}
          </div>

          <div className="mt-5 text-sm text-gray-500">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <Weight className="w-4 h-4" />
                Weight:&nbsp;
                <span className="dark:text-white text-black font-normal">
                  {(pokemon.weight / 10).toFixed(1)}kg
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Ruler className="w-4 h-4" />
                Height:&nbsp;
                <span className="dark:text-white text-black font-normal">
                  {(pokemon.height / 10).toFixed(1)}m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
