import { useEffect, FC, RefObject } from 'react';

import { Game } from '../../../../game_modules';
import { Scene } from '../../../../game_modules/Scene';

interface IGameCanvasProps {
  innerRef: RefObject<HTMLCanvasElement>;
}

export const GameCanvas: FC<IGameCanvasProps> = ({ innerRef }) => {
  useEffect(() => {
    const canvas = innerRef.current;

    if (canvas) {
      const context = canvas.getContext('2d');
      if (context === null) throw new Error('canvas context is null');

      const canvasScene = new Scene(canvas.width, canvas.height);
      const game = new Game(canvasScene, context);
      game.start();
    }
  }, [innerRef.current]);

  return <canvas ref={innerRef}></canvas>;
};
