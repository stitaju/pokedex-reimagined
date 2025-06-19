import React from 'react';

const PokemonDetailLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex">
      <div className="flex-1 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-32"></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-6"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-48"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailLoading;
