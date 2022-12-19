import React, { useRef, useEffect } from 'react';

import { Game } from '../../../../game_modules/game';
import { Scene } from '../../../../game_modules/Scene';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const context = canvasRef.current!.getContext('2d');
      if (context === null) throw new Error('canvas context is null');

      const canvasScene = new Scene(canvas.width, canvas.height);
      const game = new Game(canvasScene, context);
      game.start();
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef}></canvas>;
};
