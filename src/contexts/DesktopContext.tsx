
import React, { createContext, useContext, useState, useEffect } from 'react';

type WindowType = 'music' | 'projects' | 'portfolio';

interface Window {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface DesktopContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  windows: Window[];
  activeWindowId: string | null;
  openWindow: (type: WindowType) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

const generateWindowId = () => Math.random().toString(36).substring(2, 9);

const getWindowDefaults = (type: WindowType): Omit<Window, 'id'> => {
  const baseSize = { width: 600, height: 400 };
  const basePosition = { x: 100, y: 100 };
  
  switch (type) {
    case 'music':
      return {
        type,
        title: 'Music Player',
        isOpen: true,
        zIndex: 1,
        position: { ...basePosition, x: basePosition.x + 20 },
        size: { ...baseSize, height: 500 },
      };
    case 'projects':
      return {
        type,
        title: 'Projects',
        isOpen: true,
        zIndex: 1,
        position: { ...basePosition, x: basePosition.x + 40, y: basePosition.y + 40 },
        size: baseSize,
      };
    case 'portfolio':
      return {
        type,
        title: 'Portfolio',
        isOpen: true,
        zIndex: 1,
        position: { ...basePosition, x: basePosition.x + 60, y: basePosition.y + 60 },
        size: { width: 800, height: 600 },
      };
    default:
      return {
        type,
        title: 'Window',
        isOpen: true,
        zIndex: 1,
        position: basePosition,
        size: baseSize,
      };
  }
};

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [windows, setWindows] = useState<Window[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(1);

  // Initialize theme based on user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  // Window management functions
  const openWindow = (type: WindowType) => {
    const existingWindow = windows.find(w => w.type === type && w.isOpen);
    
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    const windowDefaults = getWindowDefaults(type);
    const newWindow: Window = {
      ...windowDefaults,
      id: generateWindowId(),
      zIndex: newZIndex,
    };
    
    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, isOpen: false } : window
      )
    );
    
    if (activeWindowId === id) {
      const openWindows = windows.filter(w => w.isOpen && w.id !== id);
      if (openWindows.length > 0) {
        const highestWindow = openWindows.reduce((prev, curr) => 
          prev.zIndex > curr.zIndex ? prev : curr
        );
        setActiveWindowId(highestWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const focusWindow = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setWindows(prev => 
      prev.map(window => 
        window.id === id 
          ? { ...window, zIndex: newZIndex, isOpen: true }
          : window
      )
    );
    
    setActiveWindowId(id);
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setWindows(prev => 
      prev.map(window => 
        window.id === id ? { ...window, position } : window
      )
    );
  };

  const value = {
    theme,
    toggleTheme,
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowPosition,
  };

  return (
    <DesktopContext.Provider value={value}>
      {children}
    </DesktopContext.Provider>
  );
};

export const useDesktop = () => {
  const context = useContext(DesktopContext);
  if (context === undefined) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
