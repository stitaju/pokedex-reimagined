import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterType: (type: string | null) => void;
  selectedType: string | null;
}

const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterType,
  selectedType,
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleTypeFilter = (type: string) => {
    if (selectedType === type) {
      onFilterType(null);
    } else {
      onFilterType(type);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-4 mb-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pokémon by name or ID..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-xl border-2 transition-colors ${
            showFilters || selectedType
              ? 'border-blue-500 bg-blue-50 text-blue-600'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <Filter className="w-5 h-5" />
        </button>
      </form>

      {showFilters && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">
              Filter by Type
            </h3>
            {selectedType && (
              <button
                onClick={() => onFilterType(null)}
                className="text-red-500 hover:text-red-600 flex items-center space-x-1 text-sm"
              >
                <X className="w-4 h-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
            {pokemonTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleTypeFilter(type)}
                className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-colors ${
                  selectedType === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
