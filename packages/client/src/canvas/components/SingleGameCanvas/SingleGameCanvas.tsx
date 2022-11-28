import React, { useEffect, useRef } from 'react';

import { FOOD_COLORS, FOOD_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../../../../shared/consts';
import { getDistanceBetweenTwoPoints } from '../../../../../shared/utils';
import { getRandomItem } from '../../../../../shared/utils/getRandomItem';
import CursorPng from '../../../assets/cursor.png';
import { Snake } from '../../../game/Snake';
import { fixPositionForMap } from '../../../utils/fixPositionForMap';
import { randomIntFromInterval } from '../../../utils/randomIntFromInterfal';
import { drawMap } from '../../drawers/drawMap';
import { makeCountDownClock } from '../../makers/makeCountDownClock';
import { makeFoodItem } from '../../makers/makeFoodItem';

export function SingleGameCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  let loopId: number | null = null;

  let mousePositionX = MAP_WIDTH / 2;
  let mousePositionY = MAP_HEIGHT / 2;
  const boost = useRef<boolean>(false);

  let foodX = randomIntFromInterval(50, MAP_WIDTH - 50);
  let foodY = randomIntFromInterval(50, MAP_HEIGHT - 50);
  let foodImg = makeFoodItem(getRandomItem(FOOD_COLORS));

  const changeFoodItem = () => {
    foodX = randomIntFromInterval(50, MAP_WIDTH - 50);
    foodY = randomIntFromInterval(50, MAP_HEIGHT - 50);
    foodImg = makeFoodItem(getRandomItem(FOOD_COLORS));
  };

  function onMouseMove(e: MouseEvent) {
    if (!ref.current) {
      throw Error('Not found canvas');
    }

    const { x, y } = fixPositionForMap({
      x: Math.ceil(e.clientX - ref.current.getBoundingClientRect().left),
      y: Math.ceil(e.clientY - ref.current.getBoundingClientRect().top),
    });

    mousePositionX = x;
    mousePositionY = y;
  }

  function onMouseDown() {
    boost.current = true;
  }

  function onMouseUp() {
    boost.current = false;
  }

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      throw Error('No canvas or context');
    }

    document.addEventListener('mousemove', onMouseMove);

    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;

    const snake = new Snake(mousePositionX, mousePositionY, ctx, 'red', 2);

    const { canvas: countDownClock, cancelTimer: cancelCountDownClockTimer } = makeCountDownClock(
      MAP_WIDTH,
      MAP_HEIGHT,
      () => {
        onEnd();
        console.info(`END. SCORE: ${snake.segments.length}`);
      }
    );

    const sendCoordsLoop = () => {
      // передаем змейке координаты мыши и флаг ускорения
      snake.move(mousePositionX, mousePositionY, boost.current);
    };

    const increaseSnakeIfNeed = () => {
      const distanceToFood = getDistanceBetweenTwoPoints({ x: snake.x, y: snake.y }, { x: foodX, y: foodY });

      if (distanceToFood < 50) {
        changeFoodItem();
        snake.increaseLength();
      }
    };

    const drawCanvasLoop = () => {
      increaseSnakeIfNeed();

      // очищаем все и рисуем карту заново
      drawMap(ctx);
      ctx.drawImage(foodImg, foodX - FOOD_SIZE / 2, foodY - FOOD_SIZE / 2);
      ctx.drawImage(countDownClock, 0, 0);
      snake.draw();

      loopId = requestAnimationFrame(drawCanvasLoop);
    };

    const intervalId = setInterval(sendCoordsLoop, 0);
    drawCanvasLoop();

    function onEnd() {
      cancelCountDownClockTimer();

      if (loopId) {
        cancelAnimationFrame(loopId);
      }

      document.removeEventListener('mousemove', onMouseMove);
      clearInterval(intervalId);
    }

    return onEnd;
  }, []);

  return (
    <div
      style={{
        cursor: `url(${CursorPng}) 24 24, default`,
      }}>
      <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
    </div>
  );
}
