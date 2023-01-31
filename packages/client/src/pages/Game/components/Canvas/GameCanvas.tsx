import { Game } from '@src/game_modules';
import { Scene } from '@src/game_modules/Scene';
import { GameEndEvent } from '@src/game_modules/types';
import { useEffect, FC, RefObject } from 'react';

interface IGameCanvasProps {
  innerRef: RefObject<HTMLCanvasElement>,
  onGameOver: (e: GameEndEvent) => void
}

export const GameCanvas: FC<IGameCanvasProps> = ({ innerRef, onGameOver }) => {
  useEffect(() => {
    const canvas = innerRef.current;

    if (canvas) {
      const context = canvas.getContext('2d');
      if (context === null) throw new Error('canvas context is null');

      const canvasScene = new Scene(canvas.width, canvas.height);
      const game = new Game(canvasScene, context, onGameOver);
      game.start();
    }
  }, [innerRef.current]);

  return <canvas ref={innerRef}></canvas>;
};
