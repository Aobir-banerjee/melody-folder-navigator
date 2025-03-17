
import React from 'react';
import { DesktopProvider } from '@/contexts/DesktopContext';
import Desktop from '@/components/Desktop';

const Index: React.FC = () => {
  return (
    <DesktopProvider>
      <Desktop />
    </DesktopProvider>
  );
};

export default Index;
