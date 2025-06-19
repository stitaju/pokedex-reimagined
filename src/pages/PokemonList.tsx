import React, { useEffect, useCallback } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { getPokemonIdFromUrl } from '../services/utils';
import PokemonCard from '../components/PokemonCard';
import { Loader2, Search } from 'lucide-react';

const PokemonList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePokemonList(24);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight +
        document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 p-8 pt-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse"
          >
            <div className="h-32 bg-gray-200 dark:bg-gray-800  rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-2">
          Failed to load Pokémon
        </div>
        <p className="text-gray-600">
          Please try again later
        </p>
      </div>
    );
  }

  const allPokemon =
    data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:dark:border-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pokémon Species
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search pokémon..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm w-50"
              />
            </div>
            <select className="pl-4 pr-4 py-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm w-50">
              <option>Any generation</option>
            </select>
            <select className="pl-4 pr-4 py-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm w-50">
              <option>Any types</option>
            </select>
            <select className="pl-4 pr-4 py-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm w-50">
              <option>Any types</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-9 gap-y-16 p-8 pt-4">
        {allPokemon.map((pokemon) => {
          const pokemonId = getPokemonIdFromUrl(
            pokemon.url
          );
          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              id={pokemonId}
            />
          );
        })}
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600">
            Loading more Pokémon...
          </span>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
