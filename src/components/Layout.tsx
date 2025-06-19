import React, { useEffect, useRef } from 'react';
import {
  Search,
  LayoutGrid,
  Zap,
  Heart,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggleButton from './DarkModeToggleButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const htmlRef = useRef(document.documentElement);

  const location = useLocation();

  const sidebarItems = [
    {
      icon: LayoutGrid,
      label: 'Pokémons',
      path: '/',
    },
    {
      icon: Search,
      label: 'Search',
      path: '/search',
    },
    {
      icon: Heart,
      label: 'Favourites',
      path: '/favourites',
    },
  ];

  const pokemonDataItems = [
    { icon: Zap, label: 'Statistics', path: '/stats' },
  ];

  return (
    <div className="min-h-screen flex max-w-[1400px] m-auto">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 dark:text-white  border-r border-gray-200 dark:border-gray-700 flex flex-col sticky top-0 h-[100vh] ease-in-out">
        {/* Logo */}
        <div className="p-6 flex justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3"
          >
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
              <div className="text-xs text-gray-500 font-bold">
                Auth0 User 1
              </div>
            </div>
          </Link>
          <div>
            <DarkModeToggleButton />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6">
          {/* Main Menu */}
          <div className="px-4 mb-8">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              MAIN MENU
            </div>
            <nav className="space-y-1 border-l-[1px] dark:border-gray-600">
              {sidebarItems.map(
                ({ icon: Icon, label, path, active }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === path || active
                        ? 'bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400 border-l-2 border-blue-700 dark: border-blue-400'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Pokemon Data */}
          <div className="px-4">
            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              POKÉMON DATA
            </div>
            <nav className="space-y-1 border-l-[1px] dark:border-gray-600">
              {pokemonDataItems.map(
                ({ icon: Icon, label, path, active }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium transition-colors ${
                      location.pathname === path || active
                        ? 'bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400 border-l-2 border-blue-700 dark: border-blue-400'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
