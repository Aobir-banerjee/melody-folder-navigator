
import React from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from '@/components/ui/menubar';

interface WindowMenuBarProps {
  type: 'music' | 'projects' | 'portfolio';
}

const WindowMenuBar: React.FC<WindowMenuBarProps> = ({ type }) => {
  return (
    <Menubar className="border-b border-gray-300 dark:border-gray-600 rounded-none h-6 min-h-0 py-0 px-0.5">
      <MenubarMenu>
        <MenubarTrigger className="text-xs py-0.5 px-2">File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New <MenubarShortcut>Ctrl+N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open <MenubarShortcut>Ctrl+O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>Ctrl+S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-xs py-0.5 px-2">Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut <MenubarShortcut>Ctrl+X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>Ctrl+C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>Ctrl+V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Type-specific menu items */}
      {type === 'music' && (
        <MenubarMenu>
          <MenubarTrigger className="text-xs py-0.5 px-2">Playback</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Play/Pause</MenubarItem>
            <MenubarItem>Next Track</MenubarItem>
            <MenubarItem>Previous Track</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Volume</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      )}

      {type === 'projects' && (
        <MenubarMenu>
          <MenubarTrigger className="text-xs py-0.5 px-2">View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Details</MenubarItem>
            <MenubarItem>Icons</MenubarItem>
            <MenubarItem>List</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Refresh</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      )}

      {type === 'portfolio' && (
        <MenubarMenu>
          <MenubarTrigger className="text-xs py-0.5 px-2">Options</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Refresh</MenubarItem>
            <MenubarItem>Print</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Open in New Tab</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      )}

      <MenubarMenu>
        <MenubarTrigger className="text-xs py-0.5 px-2">Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About</MenubarItem>
          <MenubarItem>Support</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default WindowMenuBar;
