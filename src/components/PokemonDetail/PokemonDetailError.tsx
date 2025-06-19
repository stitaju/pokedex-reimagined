import React from 'react';
import { Link } from 'react-router-dom';

const PokemonDetailError: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-xl mb-2">
          Pokémon not found
        </div>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-700"
        >
          Back to Pokédex
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetailError;
