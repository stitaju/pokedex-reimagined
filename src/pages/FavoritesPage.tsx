import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from '../components/PokemonCard';
import { Heart, Loader2 } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { data: favorites = [], isLoading, error } = useFavorites();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Favorite Pokémon
            </h1>
          </div>
        </div>
        
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Loading your favorites...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Favorite Pokémon
            </h1>
          </div>
        </div>
        
        <div className="text-center py-20">
          <div className="text-red-500 text-xl mb-2">
            Failed to load favorites
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Please check your connection and try again
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500 fill-current" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Favorite Pokémon
            </h1>
            <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-sm font-medium">
              {favorites.length}
            </span>
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <Heart className="w-24 h-24 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No Favorite Pokémon Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start exploring and add Pokémon to your favorites by clicking the heart icon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-9 gap-y-16 p-8 pt-4">
          {favorites.map((favorite) => (
            <PokemonCard
              key={favorite.id}
              name={`pokemon-${favorite.id}`}
              id={favorite.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;