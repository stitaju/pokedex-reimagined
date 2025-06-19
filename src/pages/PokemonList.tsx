import React, { useEffect, useCallback, useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { useSearch } from '../hooks/useSearch';
import { getPokemonIdFromUrl } from '../services/utils';
import PokemonCard from '../components/PokemonCard';
import AdvancedSearchForm from '../components/AdvancedSearchForm';
import { Loader2, AlertCircle } from 'lucide-react';
import type { SearchRequest } from '../services/searchService';

const PokemonList: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchRequest>({
    searchText: '',
    types: [],
    habitat: [],
    classification: '',
  });
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: pokemonListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: pokemonListLoading,
    error: pokemonListError,
  } = usePokemonList(24);

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearch(searchParams, isSearching);

  // Infinite scroll handler for regular pokemon list
  const handleScroll = useCallback(() => {
    if (
      !isSearching &&
      window.innerHeight +
        document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isSearching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>
      window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearch = (params: SearchRequest) => {
    setSearchParams(params);
    const hasSearchCriteria = 
      params.searchText.trim() !== '' ||
      params.types.length > 0 ||
      params.habitat.length > 0 ||
      params.classification !== '';
    
    setIsSearching(hasSearchCriteria);
  };

  // Determine which data to display
  const isLoading = isSearching ? searchLoading : pokemonListLoading;
  const error = isSearching ? searchError : pokemonListError;
  const pokemonData = isSearching 
    ? searchData?.results || []
    : pokemonListData?.pages.flatMap((page) => page.results) || [];

  if (isLoading && pokemonData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pokémon Species
          </h1>
        </div>
        
        <div className="px-6">
          <AdvancedSearchForm onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-9 gap-y-16 p-8 pt-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse"
            >
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pokémon Species
          </h1>
        </div>
        
        <div className="px-6">
          <AdvancedSearchForm onSearch={handleSearch} />
        </div>

        <div className="text-center py-20">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <div className="text-red-500 text-xl mb-2">
            {isSearching ? 'Search failed' : 'Failed to load Pokémon'}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pokémon Species
          </h1>
          {isSearching && searchData && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Found {searchData.count} results
            </div>
          )}
        </div>
      </div>

      {/* Search Form */}
      <div className="px-6">
        <AdvancedSearchForm 
          onSearch={handleSearch} 
          isLoading={searchLoading}
        />
      </div>

      {/* Results */}
      {pokemonData.length === 0 && !isLoading ? (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <svg className="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No Pokémon Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria or clear the filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-9 gap-y-16 p-8 pt-4">
          {pokemonData.map((pokemon) => {
            const pokemonId = getPokemonIdFromUrl(pokemon.url);
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                id={pokemonId}
              />
            );
          })}
        </div>
      )}

      {/* Loading More Indicator */}
      {!isSearching && isFetchingNextPage && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Loading more Pokémon...
          </span>
        </div>
      )}
    </div>
  );
};

export default PokemonList;