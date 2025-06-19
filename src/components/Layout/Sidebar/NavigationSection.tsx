// NavigationSection.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  label,
  path,
  active,
}) => {
  const location = useLocation();

  return (
    <Link
      to={path}
      className={`flex items-center space-x-3 px-3 py-2 text-lg font-medium transition-colors ${
        location.pathname === path || active
          ? 'bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-400 border-l-2 border-blue-700 dark: border-blue-400'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
};

interface NavigationSectionProps {
  title: string;
  items: Array<{
    icon: LucideIcon;
    label: string;
    path: string;
    active?: boolean;
  }>;
}

const NavigationSection: React.FC<
  NavigationSectionProps
> = ({ title, items }) => {
  return (
    <div className="px-4 mb-8">
      <div className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
        {title}
      </div>
      <nav className="space-y-1 border-l-[1px] dark:border-gray-600">
        {items.map((item) => (
          <NavigationItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={item.active}
          />
        ))}
      </nav>
    </div>
  );
};

export default NavigationSection;
