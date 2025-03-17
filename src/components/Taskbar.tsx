
import React from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import { Home, Music, FolderOpen, User, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Taskbar: React.FC = () => {
  const { 
    windows, 
    activeWindowId, 
    openWindow, 
    focusWindow 
  } = useDesktop();

  const activeWindows = windows.filter(w => w.isOpen);

  return (
    <div className="taskbar w-full bg-window-header-light dark:bg-window-header-dark border-t border-gray-300 dark:border-gray-600 flex items-center justify-between p-1 px-2 h-12 shadow-md z-50">
      {/* Start Button */}
      <div className="flex items-center">
        <button className="start-button bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-md flex items-center gap-1 mr-2">
          <Home size={20} />
          <span className="text-xs font-medium hidden sm:inline">Start</span>
        </button>
        
        {/* Quick Launch */}
        <div className="quick-launch flex space-x-1">
          <button 
            className="taskbar-icon p-1.5 hover:bg-white/10 rounded"
            onClick={() => openWindow('music')}
          >
            <Music size={18} className="text-primary" />
          </button>
          <button 
            className="taskbar-icon p-1.5 hover:bg-white/10 rounded"
            onClick={() => openWindow('projects')}
          >
            <FolderOpen size={18} className="text-accent" />
          </button>
          <button 
            className="taskbar-icon p-1.5 hover:bg-white/10 rounded"
            onClick={() => openWindow('portfolio')}
          >
            <User size={18} className="text-secondary-foreground" />
          </button>
        </div>
      </div>
      
      {/* Window Buttons */}
      <div className="window-buttons flex-1 flex justify-center space-x-1 overflow-x-auto pl-2 pr-2">
        {activeWindows.map(window => (
          <button
            key={window.id}
            className={`window-button flex items-center h-full px-2 py-1 rounded max-w-[150px] truncate ${
              window.id === activeWindowId 
                ? 'bg-white/20 border-b-2 border-primary' 
                : 'hover:bg-white/10'
            }`}
            onClick={() => focusWindow(window.id)}
          >
            {window.type === 'music' && <Music size={16} className="mr-1 text-primary" />}
            {window.type === 'projects' && <FolderOpen size={16} className="mr-1 text-accent" />}
            {window.type === 'portfolio' && <User size={16} className="mr-1 text-secondary-foreground" />}
            <span className="text-xs font-medium truncate">{window.title}</span>
          </button>
        ))}
      </div>
      
      {/* System Tray */}
      <div className="system-tray flex items-center space-x-2">
        <ThemeToggle />
        <div className="time-display text-xs font-medium px-2">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
