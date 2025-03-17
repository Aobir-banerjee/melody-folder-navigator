
import React from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import Window from './Window';
import MusicPlayer from './MusicPlayer';
import ProjectFolder from './ProjectFolder';
import Portfolio from './Portfolio';
import ThemeToggle from './ThemeToggle';
import { Music, FolderOpen, User } from 'lucide-react';

const Desktop: React.FC = () => {
  const { 
    windows, 
    activeWindowId, 
    openWindow, 
    closeWindow 
  } = useDesktop();

  // Handle icon click
  const handleIconClick = (type: 'music' | 'projects' | 'portfolio') => {
    openWindow(type);
  };

  return (
    <div 
      className={`min-h-screen w-full 
                bg-desktop-light dark:bg-desktop-dark transition-colors duration-300
                flex flex-col overflow-hidden p-4`}
    >
      {/* Desktop Icons */}
      <div className="grid grid-cols-1 gap-4 w-20">
        <div 
          className="desktop-icon"
          onClick={() => handleIconClick('music')}
        >
          <div className="rounded-full bg-primary/10 p-2 mb-1">
            <Music size={24} className="text-primary" />
          </div>
          <span className="desktop-icon-text">Music</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleIconClick('projects')}
        >
          <div className="rounded-full bg-accent/10 p-2 mb-1">
            <FolderOpen size={24} className="text-accent" />
          </div>
          <span className="desktop-icon-text">Projects</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleIconClick('portfolio')}
        >
          <div className="rounded-full bg-secondary/50 p-2 mb-1">
            <User size={24} className="text-secondary-foreground" />
          </div>
          <span className="desktop-icon-text">Portfolio</span>
        </div>
      </div>
      
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Windows */}
      {windows.filter(w => w.isOpen).map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          zIndex={window.zIndex}
          position={window.position}
          size={window.size}
          onClose={() => closeWindow(window.id)}
        >
          {window.type === 'music' && <MusicPlayer />}
          {window.type === 'projects' && <ProjectFolder />}
          {window.type === 'portfolio' && <Portfolio />}
        </Window>
      ))}
    </div>
  );
};

export default Desktop;
