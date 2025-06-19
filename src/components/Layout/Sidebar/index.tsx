import React from 'react';
import { LayoutGrid, Zap, Heart } from 'lucide-react';
import Branding from '../Branding';
import NavigationSection from './NavigationSection';
import UserSection from './UserSection';

const Sidebar: React.FC = () => {
  const sidebarItems = [
    {
      icon: LayoutGrid,
      label: 'Pokémons',
      path: '/',
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
    <div className="w-64 bg-white dark:bg-gray-800 dark:text-white border-r border-gray-200 dark:border-gray-700 flex flex-col sticky top-0 h-[100vh] ease-in-out">
      <Branding />

      <div className="flex-1 py-6">
        <NavigationSection
          title="MAIN MENU"
          items={sidebarItems}
        />
        <NavigationSection
          title="POKÉMON DATA"
          items={pokemonDataItems}
        />
        <UserSection />
      </div>
    </div>
  );
};

export default Sidebar;
