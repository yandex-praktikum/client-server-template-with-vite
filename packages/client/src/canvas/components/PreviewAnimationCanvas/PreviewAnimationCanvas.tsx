import React, { useEffect, useRef } from 'react';

import { changeCoords } from './helpers/changeCoords';

import { Snake } from '../../../game/Snake';

const blueOptions = {
  x: 0,
  y: 0,
  margin: 150,
  size: 30,
};

const greenOptions = {
  x: 0,
  y: 0,
  margin: 100,
  size: 20,
};

const yellowOptions = {
  x: 0,
  y: 0,
  margin: 50,
  size: 20,
};

const redOptions = {
  x: 0,
  y: 0,
  margin: 0,
  size: 20,
};

const MAP_WIDTH = 1300;
const MAP_HEIGHT = 400;

export function PreviewAnimationCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      throw Error('No canvas or context');
    }

    const redSnake = new Snake(
      redOptions.size + redOptions.margin,
      redOptions.size + redOptions.margin,
      ctx,
      'red',
      40,
      34
    );

    const yellowSnake = new Snake(
      yellowOptions.size + yellowOptions.margin,
      MAP_HEIGHT - (yellowOptions.size + yellowOptions.margin),

      ctx,
      'green',
      15,
      26
    );

    const greenSnake = new Snake(
      MAP_WIDTH - (greenOptions.size + greenOptions.margin),
      MAP_HEIGHT - (greenOptions.size + greenOptions.margin),
      ctx,
      'yellow',
      10,
      22
    );

    const blueSnake = new Snake(
      MAP_WIDTH - (blueOptions.size + blueOptions.margin),
      blueOptions.size + blueOptions.margin,
      ctx,
      'blue',
      30,
      30
    );

    let loopId: number | null = null;

    const drawMapLoop = () => {
      ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

      const { x: redSnakeX, y: redSnakeY } = redSnake.segments[0];
      changeCoords(redSnakeX, redSnakeY, MAP_WIDTH, MAP_HEIGHT, redOptions);

      const { x: yellowSnakeX, y: yellowSnakeY } = yellowSnake.segments[0];
      changeCoords(yellowSnakeX, yellowSnakeY, MAP_WIDTH, MAP_HEIGHT, yellowOptions);

      const { x: greenSnakeX, y: greenSnakeY } = greenSnake.segments[0];
      changeCoords(greenSnakeX, greenSnakeY, MAP_WIDTH, MAP_HEIGHT, greenOptions);

      const { x: blueSnakeX, y: blueSnakeY } = blueSnake.segments[0];
      changeCoords(blueSnakeX, blueSnakeY, MAP_WIDTH, MAP_HEIGHT, blueOptions);

      redSnake.move(redOptions.x, redOptions.y, false);
      yellowSnake.move(yellowOptions.x, yellowOptions.y, true);
      greenSnake.move(greenOptions.x, greenOptions.y, true);
      blueSnake.move(blueOptions.x, blueOptions.y, false);

      redSnake.draw();
      yellowSnake.draw();
      greenSnake.draw();
      blueSnake.draw();

      loopId = requestAnimationFrame(drawMapLoop);
    };

    drawMapLoop();

    return () => {
      if (loopId) {
        cancelAnimationFrame(loopId);
      }
    };
  }, []);

  return <canvas ref={ref} width={MAP_WIDTH} height={MAP_HEIGHT} style={{ background: 'black' }} />;
}
