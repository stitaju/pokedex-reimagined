import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FavoriteButton from '../common/FavoriteButton';

interface PokemonDetailHeaderProps {
  pokemonId: number;
  pokemonName: string;
}

const PokemonDetailHeader: React.FC<
  PokemonDetailHeaderProps
> = ({ pokemonId, pokemonName }) => {
  return (
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
              {pokemonName}
            </h1>
            <p className="text-gray-500 text-xl">
              #{pokemonId.toString().padStart(4, '0')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FavoriteButton
            pokemonId={pokemonId}
            pokemonName={pokemonName}
            size="lg"
          />
          <button className="px-4 py-2 border bg-blue-600 dark:border-blue-300 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailHeader;
