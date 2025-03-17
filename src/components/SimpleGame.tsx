
import React, { useState, useEffect, useRef } from 'react';

type Position = {
  x: number;
  y: number;
};

type Collectible = Position & {
  id: number;
};

const SimpleGame: React.FC = () => {
  const [player, setPlayer] = useState<Position>({ x: 50, y: 50 });
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const PLAYER_SIZE = 30;
  const COLLECTIBLE_SIZE = 20;
  const PLAYER_SPEED = 5;
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 300;

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setPlayer({ x: 50, y: 50 });
    generateCollectibles();
  };

  // Generate collectibles
  const generateCollectibles = () => {
    const newCollectibles = [];
    for (let i = 0; i < 5; i++) {
      newCollectibles.push({
        id: i,
        x: Math.random() * (GAME_WIDTH - COLLECTIBLE_SIZE),
        y: Math.random() * (GAME_HEIGHT - COLLECTIBLE_SIZE),
      });
    }
    setCollectibles(newCollectibles);
  };

  // Check for collisions with collectibles
  const checkCollisions = () => {
    collectibles.forEach((collectible) => {
      if (
        player.x < collectible.x + COLLECTIBLE_SIZE &&
        player.x + PLAYER_SIZE > collectible.x &&
        player.y < collectible.y + COLLECTIBLE_SIZE &&
        player.y + PLAYER_SIZE > collectible.y
      ) {
        setCollectibles(collectibles.filter((c) => c.id !== collectible.id));
        setScore((prevScore) => prevScore + 10);
      }
    });

    if (collectibles.length === 0) {
      generateCollectibles();
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const keyState: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keyState[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keyState[e.key] = false;
    };

    const update = () => {
      if (!gameStarted) return;

      let newX = player.x;
      let newY = player.y;

      if (keyState['ArrowUp'] || keyState['w']) newY -= PLAYER_SPEED;
      if (keyState['ArrowDown'] || keyState['s']) newY += PLAYER_SPEED;
      if (keyState['ArrowLeft'] || keyState['a']) newX -= PLAYER_SPEED;
      if (keyState['ArrowRight'] || keyState['d']) newX += PLAYER_SPEED;

      // Boundary checks
      newX = Math.max(0, Math.min(newX, GAME_WIDTH - PLAYER_SIZE));
      newY = Math.max(0, Math.min(newY, GAME_HEIGHT - PLAYER_SIZE));

      setPlayer({ x: newX, y: newY });
      checkCollisions();

      requestRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [player, collectibles, gameStarted]);

  // Save high score when game ends
  useEffect(() => {
    return () => {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('gameHighScore', score.toString());
      }
    };
  }, [score, highScore]);

  // Load high score on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('gameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex items-center justify-between w-full">
        <h2 className="text-xl font-bold">Collectible Game</h2>
        <div className="text-md font-semibold">Score: {score} | High Score: {highScore}</div>
      </div>

      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center h-[300px] w-[400px] bg-secondary/20 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2">Collect the dots!</h3>
          <p className="text-muted-foreground mb-4 text-center">
            Use arrow keys or WASD to move.<br />Collect all dots to win!
          </p>
          <button
            onClick={startGame}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div
          ref={gameAreaRef}
          className="relative h-[300px] w-[400px] bg-secondary/20 rounded-lg border border-border overflow-hidden"
        >
          <div
            className="absolute bg-accent rounded-md"
            style={{
              width: PLAYER_SIZE,
              height: PLAYER_SIZE,
              left: player.x,
              top: player.y,
              transition: 'left 0.1s, top 0.1s',
            }}
          />
          {collectibles.map((collectible) => (
            <div
              key={collectible.id}
              className="absolute bg-primary rounded-full"
              style={{
                width: COLLECTIBLE_SIZE,
                height: COLLECTIBLE_SIZE,
                left: collectible.x,
                top: collectible.y,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground">
        {gameStarted && (
          <button
            onClick={() => setGameStarted(false)}
            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default SimpleGame;
