
import React from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import Window from './Window';
import MusicPlayer from './MusicPlayer';
import ProjectFolder from './ProjectFolder';
import Portfolio from './Portfolio';
import SimpleGame from './SimpleGame';
import ThemeToggle from './ThemeToggle';
import Taskbar from './Taskbar';
import { Music, FolderOpen, User, Gamepad2 } from 'lucide-react';

const Desktop: React.FC = () => {
  const { 
    windows, 
    activeWindowId, 
    openWindow, 
    closeWindow 
  } = useDesktop();

  // Handle icon click
  const handleIconClick = (type: 'music' | 'projects' | 'portfolio' | 'game') => {
    openWindow(type);
  };

  return (
    <div 
      className={`min-h-screen w-full 
                bg-desktop-light dark:bg-desktop-dark transition-colors duration-300
                flex flex-col overflow-hidden`}
    >
      {/* Desktop Icons */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 justify-start">
          <div 
            className="desktop-icon"
            onClick={() => handleIconClick('music')}
          >
            <div className="desktop-icon-img-container">
              <Music size={32} className="text-primary" />
            </div>
            <span className="desktop-icon-text">Music Player</span>
          </div>
          
          <div 
            className="desktop-icon"
            onClick={() => handleIconClick('projects')}
          >
            <div className="desktop-icon-img-container">
              <FolderOpen size={32} className="text-accent" />
            </div>
            <span className="desktop-icon-text">My Projects</span>
          </div>
          
          <div 
            className="desktop-icon"
            onClick={() => handleIconClick('portfolio')}
          >
            <div className="desktop-icon-img-container">
              <User size={32} className="text-secondary-foreground" />
            </div>
            <span className="desktop-icon-text">Portfolio</span>
          </div>

          <div 
            className="desktop-icon"
            onClick={() => handleIconClick('game')}
          >
            <div className="desktop-icon-img-container">
              <Gamepad2 size={32} className="text-green-500 dark:text-green-400" />
            </div>
            <span className="desktop-icon-text">Simple Game</span>
          </div>
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
          type={window.type}
          zIndex={window.zIndex}
          position={window.position}
          size={window.size}
          onClose={() => closeWindow(window.id)}
        >
          {window.type === 'music' && <MusicPlayer />}
          {window.type === 'projects' && <ProjectFolder />}
          {window.type === 'portfolio' && <Portfolio />}
          {window.type === 'game' && <SimpleGame />}
        </Window>
      ))}
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;
