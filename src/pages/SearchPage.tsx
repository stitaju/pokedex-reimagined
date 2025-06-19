import React, { useState } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import { fetchPokemonType } from '../services/pokemonService';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { getPokemonIdFromUrl } from '../services/utils';
import { AlertCircle } from 'lucide-react';

const SearchPage: React.FC = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<
    string | null
  >(null);
  const [searchedPokemon, setSearchedPokemon] = useState<
    string | null
  >(null);

  const {
    data: pokemon,
    isLoading: pokemonLoading,
    error: pokemonError,
  } = usePokemon(searchedPokemon || '');

  const { data: typeData, isLoading: typeLoading } =
    useQuery({
      queryKey: ['pokemonType', selectedType],
      queryFn: () => fetchPokemonType(selectedType!),
      enabled: !!selectedType,
    });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchedPokemon(query.toLowerCase().trim());
      setSelectedType(null);
    }
  };

  const handleFilterType = (type: string | null) => {
    setSelectedType(type);
    setSearchedPokemon(null);
  };

  const typePokemon = typeData?.pokemon?.slice(0, 20) || [];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Search Pokémon
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find your favorite Pokémon by name, ID, or filter
          by type.
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onFilterType={handleFilterType}
        selectedType={selectedType}
      />

      {/* Search Results */}
      {searchedPokemon && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Search Results
          </h2>
          {pokemonLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ) : pokemonError ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Pokémon Not Found
              </h3>
              <p className="text-red-600">
                No Pokémon found with the name or ID "
                {searchedPokemon}". Please try a different
                search term.
              </p>
            </div>
          ) : pokemon ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <PokemonCard
                name={pokemon.name}
                id={pokemon.id}
              />
            </div>
          ) : null}
        </div>
      )}

      {/* Type Filter Results */}
      {selectedType && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedType.charAt(0).toUpperCase() +
              selectedType.slice(1)}{' '}
            Type Pokémon
          </h2>
          {typeLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
                >
                  <div className="h-32 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : typePokemon.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {typePokemon.map(
                ({ pokemon: pokemonRef }) => {
                  const pokemonId = getPokemonIdFromUrl(
                    pokemonRef.url
                  );
                  return (
                    <PokemonCard
                      key={pokemonRef.name}
                      name={pokemonRef.name}
                      id={pokemonId}
                    />
                  );
                }
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No Pokémon found for this type.
            </div>
          )}
        </div>
      )}

      {/* Default State */}
      {!searchedPokemon && !selectedType && (
        <div className="text-center py-20">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-24 h-24 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Start Your Search
          </h3>
          <p className="text-gray-500">
            Enter a Pokémon name or ID above, or filter by
            type to discover Pokémon.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
