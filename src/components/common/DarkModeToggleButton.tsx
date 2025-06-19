import React, { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeRadioSwitch: React.FC = () => {
  const htmlRef = useRef<HTMLElement | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDarkMode = () => {
    const html = htmlRef.current;
    if (!html) return;

    html.classList.toggle('dark');
    const darkNow = html.classList.contains('dark');

    if (darkNow) {
      html.classList.add('bg-gray-800');
    } else {
      html.classList.remove('bg-gray-800');
    }

    localStorage.setItem(
      'theme',
      darkNow ? 'dark' : 'light'
    );
    setIsDark(darkNow);
  };

  useEffect(() => {
    htmlRef.current = document.documentElement;
    const html = htmlRef.current;
    const saved = localStorage.getItem('theme') === 'dark';

    if (saved) {
      html.classList.add('dark', 'bg-gray-800');
    } else {
      html.classList.remove('dark', 'bg-gray-800');
    }

    setIsDark(saved);
  }, []);

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative flex items-center w-14 h-8 rounded-full transition-colors duration-500 ${
        isDark ? 'bg-gray-700' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-500
          ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
      />

      {/* Icons inside switch */}
      <span className="absolute left-[7px] top-[7px] text-blue-500 dark:text-gray-500">
        <Sun className="w-4 h-4" />
      </span>
      <span className="absolute right-[7px] top-[7px] text-gray-100 dark:text-blue-400">
        <Moon className="w-4 h-4" />
      </span>
    </button>
  );
};

export default DarkModeRadioSwitch;
