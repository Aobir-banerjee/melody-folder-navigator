
import React, { useState, useEffect } from 'react';
import { PORTFOLIO_URL } from '@/lib/constants';
import { ScrollArea } from './ui/scroll-area';

const Portfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">My Portfolio</h2>
        <a 
          href={PORTFOLIO_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          Open in new tab
        </a>
      </div>
      
      <ScrollArea className="flex-1 rounded-md border border-border">
        {isLoading ? (
          <div className="h-full min-h-[300px] flex items-center justify-center bg-muted/30">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-sm text-muted-foreground">Loading portfolio...</p>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[300px]">
            <iframe
              src={PORTFOLIO_URL}
              title="Portfolio"
              className="w-full h-full min-h-[300px] border-0"
              style={{ height: 'calc(100vh - 200px)' }}
            />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Portfolio;
