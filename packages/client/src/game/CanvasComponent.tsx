import React, { useEffect, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

import { MySnake } from './Snake'
import { getDistanceBetweenTwoPoints } from './helpers/getDistanceBetweenTwoPoints'
import { makeFoodItem } from './helpers/makeFoodItem'
import { makeCountDownClock } from './helpers/makeCountDownClock'

const SHOW_LOGS = false

export function CanvasComponent() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState<number | null>(null)

  const MAP_WIDTH = 1200;
  const MAP_HEIGHT = 800;

  let mousePositionX = MAP_WIDTH / 2;
  let mousePositionY = MAP_HEIGHT / 2;
  let boost = false;

  function onMouseMove(e: MouseEvent) {
    if (!ref.current) {
      throw Error('Not found canvas');
    }

    mousePositionX = Math.ceil(e.clientX - ref.current.getBoundingClientRect().left);

    mousePositionY = Math.ceil(e.clientY - ref.current.getBoundingClientRect().top);
  }

  function onMouseDown() {
    boost = true;
  }

  function onMouseUp() {
    boost = false;
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

    let { foodY, foodX, foodImg } = makeFoodItem(canvas.width, canvas.height);

    const snake = new MySnake(mousePositionX, mousePositionY, ctx, 'green', 2);
    snake.showLogs = SHOW_LOGS;

    const countDownClock = makeCountDownClock(MAP_WIDTH, MAP_HEIGHT, () => {
      setScore(snake.segments.length)
    })

    const drawLogs = () => {
      if (!SHOW_LOGS) {
        return;
      }

      ctx.font = '20px serif';
      ctx.fillStyle = 'white';
      ctx.fillText(`Boost: ${boost}`, 10, 20);
      ctx.fillText(`Snake length: ${snake.segments.length}`, 10, 40);
      ctx.fillText(`Mouse x: ${mousePositionX} ; y: ${mousePositionY}`, 10, 60);

      ctx.fillStyle = 'red';
      ctx.fillText(`Food x: ${foodX}`, canvas.width - 200, 60);
      ctx.fillText(`Food y: ${foodY}`, canvas.width - 200, 80);
    };

    const sendCoordsLoop = () => {
      // передаем змейке координаты мыши и флаг ускорения
      snake.move(mousePositionX, mousePositionY, boost);
    };

    let loopId: number | null = null;

    const increaseSnakeIfNeed = () => {
      const distanceToFood = getDistanceBetweenTwoPoints({ x: snake.x, y: snake.y }, { x: foodX, y: foodY });

      if (distanceToFood < 50) {
        changeFoodItem();
        snake.increaseLength();
      }
    };

    const changeFoodItem = () => {
      const newFood = makeFoodItem(canvas.width, canvas.height);
      foodY = newFood.foodY;
      foodX = newFood.foodX;
      foodImg = newFood.foodImg;
    };

    const drawMapLoop = () => {
      increaseSnakeIfNeed();

      // очищаем все и рисуем карту заново
      ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
      ctx.fillStyle = '#1c1c1c'; // фон карты
      ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

      ctx.drawImage(foodImg, foodX, foodY)
      ctx.drawImage(countDownClock, 0, 0)

      snake.draw();

      drawLogs();

      loopId = requestAnimationFrame(drawMapLoop);
    };

    const intervalId = setInterval(sendCoordsLoop, 0);
    drawMapLoop();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      clearInterval(intervalId);

      if (loopId) {
        cancelAnimationFrame(loopId);
      }
    };
  }, []);

  const handleClose = () => {
    window.location.reload()
  }

  return (
    <>
      <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
      <Dialog open={!!score} onClose={handleClose}>
        <DialogTitle>Your score: {score}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Play again
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
