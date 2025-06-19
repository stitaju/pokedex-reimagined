import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggleButton from '../common/DarkModeToggleButton';

const Branding: React.FC = () => {
  return (
    <div className="p-6 flex justify-between">
      <Link to="/" className="flex items-center space-x-3">
        <div className="w-8 h-8flex items-center justify-center">
          <img
            src="https://assets.pokemon.com/static2/_ui/img/favicon.ico"
            alt=""
          />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            POKÉMON
          </div>
          <div className="text-sm text-gray-500 font-bold">
            Discover All
          </div>
        </div>
      </Link>
      <div>
        <DarkModeToggleButton />
      </div>
    </div>
  );
};

export default Branding;
