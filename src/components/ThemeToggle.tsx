
import React from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useDesktop();

  return (
    <button
      onClick={toggleTheme}
      className="glass-panel p-2 rounded-full hover:scale-105 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Sun size={22} className="text-orange-500" />
      ) : (
        <Moon size={22} className="text-blue-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
