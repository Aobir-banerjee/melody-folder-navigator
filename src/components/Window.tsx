
import React, { useRef, useState, useEffect } from 'react';
import { useDesktop } from '@/contexts/DesktopContext';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import WindowMenuBar from './WindowMenuBar';

interface WindowProps {
  id: string;
  title: string;
  type: 'music' | 'projects' | 'portfolio' | 'game';
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  type,
  zIndex,
  position,
  size,
  onClose,
  children,
}) => {
  const { focusWindow, updateWindowPosition } = useDesktop();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousSize, setPreviousSize] = useState(size);
  const [previousPosition, setPreviousPosition] = useState(position);
  const windowRef = useRef<HTMLDivElement>(null);

  // Focus window when clicked
  const handleWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(id);
  };

  // Handle drag start
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    e.preventDefault();
    focusWindow(id);
    
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      
      setIsDragging(true);
    }
  };

  // Handle drag and drop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        // Ensure window stays in viewport
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 40;
        
        updateWindowPosition(id, {
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, updateWindowPosition]);

  // Close window
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  // Minimize window
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Minimize functionality will be implemented with taskbar
  };

  // Maximize/restore window
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isMaximized) {
      // Restore window
      updateWindowPosition(id, previousPosition);
      setIsMaximized(false);
    } else {
      // Maximize window
      setPreviousPosition(position);
      setPreviousSize(size);
      updateWindowPosition(id, { x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  // Double click on header to maximize/restore
  const handleHeaderDoubleClick = () => {
    handleMaximize({ stopPropagation: () => {} } as React.MouseEvent);
  };

  return (
    <div
      ref={windowRef}
      className={`window absolute transition-shadow duration-200 ${
        isMaximized ? 'fixed inset-0 w-full h-full m-0 rounded-none' : ''
      }`}
      style={{
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? '100%' : size.height,
        left: position.x,
        top: position.y,
        zIndex,
      }}
      onClick={handleWindowClick}
    >
      <div 
        className="window-header"
        onMouseDown={handleHeaderMouseDown}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="flex items-center space-x-2">
          <div className="window-control bg-red-500 hover:bg-red-600" onClick={handleClose}></div>
          <div className="window-control bg-yellow-500 hover:bg-yellow-600" onClick={handleMinimize}></div>
          <div className="window-control bg-green-500 hover:bg-green-600" onClick={handleMaximize}></div>
        </div>
        <div className="flex-1 text-center font-medium text-sm truncate px-2">
          {title}
        </div>
        <div className="w-14 flex justify-end space-x-2">
          <Minus 
            size={16} 
            className="cursor-pointer hover:text-gray-200 transition-colors" 
            onClick={handleMinimize} 
          />
          {isMaximized ? (
            <Square 
              size={14} 
              className="cursor-pointer hover:text-gray-200 transition-colors" 
              onClick={handleMaximize} 
            />
          ) : (
            <Maximize2 
              size={14} 
              className="cursor-pointer hover:text-gray-200 transition-colors" 
              onClick={handleMaximize} 
            />
          )}
          <X 
            size={16} 
            className="cursor-pointer hover:text-gray-200 transition-colors" 
            onClick={handleClose} 
          />
        </div>
      </div>
      
      {/* Menu Bar */}
      <WindowMenuBar type={type} />
      
      <div 
        className="window-body" 
        style={{ 
          height: isMaximized 
            ? 'calc(100% - 2.5rem - 24px)' 
            : `calc(${size.height}px - 2.5rem - 24px)` 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
