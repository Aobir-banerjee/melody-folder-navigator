
import React from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useDesktop();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded hover:bg-white/10 transition-all duration-200"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Sun size={18} className="text-orange-500" />
      ) : (
        <Moon size={18} className="text-blue-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
