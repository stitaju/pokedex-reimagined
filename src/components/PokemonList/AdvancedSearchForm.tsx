import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  pokemonTypes,
  pokemonHabitats,
  pokemonClassifications,
} from '../../services/searchService';
import type { SearchRequest } from '../../services/searchService';

interface AdvancedSearchFormProps {
  onSearch: (searchParams: SearchRequest) => void;
  isLoading?: boolean;
}

interface FormData {
  searchText: string;
  types: Array<{ value: string; label: string }>;
  habitat: Array<{ value: string; label: string }>;
  classification: { value: string; label: string } | null;
}

const AdvancedSearchForm: React.FC<
  AdvancedSearchFormProps
> = ({ onSearch, isLoading = false }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { control, handleSubmit, reset, watch } =
    useForm<FormData>({
      defaultValues: {
        searchText: '',
        types: [],
        habitat: [],
        classification: null,
      },
    });

  const watchedValues = watch();
  const hasFilters =
    watchedValues.types.length > 0 ||
    watchedValues.habitat.length > 0 ||
    watchedValues.classification !== null;

  const typeOptions = pokemonTypes.map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
  }));

  const habitatOptions = pokemonHabitats.map((habitat) => ({
    value: habitat,
    label: habitat
      .split('-')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' '),
  }));

  const classificationOptions = pokemonClassifications.map(
    (classification) => ({
      value: classification,
      label: classification,
    })
  );

  const onSubmit = (data: FormData) => {
    const searchParams: SearchRequest = {
      searchText: data.searchText.trim(),
      types: data.types.map((type) => type.value),
      habitat: data.habitat.map((hab) => hab.value),
      classification: data.classification?.value || '',
    };
    onSearch(searchParams);
  };

  const handleClear = () => {
    reset();
    onSearch({
      searchText: '',
      types: [],
      habitat: [],
      classification: '',
    });
  };

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused
        ? '0 0 0 2px rgba(59, 130, 246, 0.2)'
        : 'none',
      '&:hover': {
        borderColor: '#9ca3af',
      },
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#eff6ff',
      borderRadius: '6px',
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: '#1e40af',
      fontWeight: '500',
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: '#6b7280',
      '&:hover': {
        backgroundColor: '#dbeafe',
        color: '#dc2626',
      },
    }),
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Search Text Input */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Controller
              name="searchText"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Search Pokémon"
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                />
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`p-2 rounded-xl border-2 transition-colors flex items-center space-x-2 ${
              showAdvanced || hasFilters
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 text-gray-500 dark:hover:border-gray-500'
            }`}
          >
            <Filter className="w-5 h-5" />
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="text-red-500 hover:text-red-600 flex items-center space-x-1 text-sm px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="absolute right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-6 space-y-4 rounded min-w-[42rem]">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Advanced Filters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Types Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Types
                </label>
                <Controller
                  name="types"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={typeOptions}
                      placeholder="Select types..."
                      className="text-sm"
                      styles={customSelectStyles}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: '#3b82f6',
                          primary25: '#eff6ff',
                        },
                      })}
                    />
                  )}
                />
              </div>

              {/* Habitat Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Habitat
                </label>
                <Controller
                  name="habitat"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={habitatOptions}
                      placeholder="Select habitats..."
                      className="text-sm"
                      styles={customSelectStyles}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: '#3b82f6',
                          primary25: '#eff6ff',
                        },
                      })}
                    />
                  )}
                />
              </div>

              {/* Classification Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Classification
                </label>
                <Controller
                  name="classification"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isClearable
                      options={classificationOptions}
                      placeholder="Select classification..."
                      className="text-sm"
                      styles={customSelectStyles}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: '#3b82f6',
                          primary25: '#eff6ff',
                        },
                      })}
                    />
                  )}
                />
              </div>
            </div>

            {/* Active Filters Display */}
            {hasFilters && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Active Filters:
                </div>
                <div className="flex flex-wrap gap-2">
                  {watchedValues.types.map((type) => (
                    <span
                      key={type.value}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      Type: {type.label}
                    </span>
                  ))}
                  {watchedValues.habitat.map((hab) => (
                    <span
                      key={hab.value}
                      className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      Habitat: {hab.label}
                    </span>
                  ))}
                  {watchedValues.classification && (
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
                      Class:{' '}
                      {watchedValues.classification.label}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdvancedSearchForm;
