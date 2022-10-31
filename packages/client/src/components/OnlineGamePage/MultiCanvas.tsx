import { blue, green, red, yellow } from '@material-ui/core/colors';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { FOOD_SIZE, MAP_HEIGHT, MAP_WIDTH, SEGMENT_SIZE } from '../../../../shared/consts';
import type { TFoodColor, TGame, TPlayer, TPosition, TSnakeColor } from '../../../../shared/types';
import { makeCountDownClock } from '../../game/helpers/makeCountDownClock';
import { makeSnakeSegment } from '../../game/helpers/makeSnakeSegment';
import { socket } from '../../services/socket/socket';
import { useAppSelector } from '../../store/hooks';

// TODO: разрешить играть оффлайн в одиночный режим

// TODO: рефактор всего этого файла + вынести общие функции для оффлан и онлайн игр

// TODO: почему не внутри и почему начальная позиция такая? мб лучше центр ? и вынести ее из константы из shared
const cursorPosition: TPosition = { x: 100, y: 100 };

export const MultiCanvas = () => {
  // todo: выбрать начальную позицию

  // TODO: мб использовать useRef ?
  let { currentGame } = useAppSelector(state => state.common);

  const navigator = useNavigate();

  if (!currentGame) {
    navigator('/game-multiplayer');

    return null;
  }

  const { currentUser } = useAppSelector(state => state.common);

  const ref = useRef<HTMLCanvasElement>(null);
  let loopId: number | null = null;

  // TODO: передавать событие буст
  // TODO: disable eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let boost = false;

  function onMouseMove(e: MouseEvent) {
    if (!ref.current) {
      throw Error('Not found canvas');
    }

    if (!currentGame) {
      // TODO: выбросить исключение и нормально его обработать
      throw Error('No game');
    }

    cursorPosition.x = Math.ceil(e.clientX - ref.current.getBoundingClientRect().left);
    cursorPosition.y = Math.ceil(e.clientY - ref.current.getBoundingClientRect().top);

    // TODO: вынести в функцию fix position

    if (cursorPosition.x < 0) {
      cursorPosition.x = 0;
    }

    if (cursorPosition.x > MAP_WIDTH) {
      cursorPosition.x = MAP_WIDTH;
    }

    if (cursorPosition.y < 0) {
      cursorPosition.y = 0;
    }

    if (cursorPosition.y > MAP_HEIGHT) {
      cursorPosition.y = MAP_HEIGHT;
    }
  }

  function onMouseDown() {
    boost = true;
  }

  function onMouseUp() {
    boost = false;
  }

  useEffect(() => {
    // TODO: нормально обработать
    if (!currentGame) {
      return;
    }

    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      throw Error('No canvas or context');
    }

    document.addEventListener('mousemove', onMouseMove);

    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;

    const countDownClock = makeCountDownClock(MAP_WIDTH, MAP_HEIGHT, () => {
      // TODO: сделать красивое завершение игры
      alert('finish');

      if (loopId) {
        cancelAnimationFrame(loopId);
      }
    });

    const drawMapLoop = () => {
      if (!currentGame) {
        throw Error('!current game');
      }

      loopId = requestAnimationFrame(drawMapLoop);

      // очищаем все и рисуем карту заново
      ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
      ctx.fillStyle = '#1c1c1c'; // фон карты
      ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

      ctx.drawImage(makeFoodItem(currentGame.food.color), currentGame.food.position.x, currentGame.food.position.y);
      ctx.drawImage(countDownClock, 0, 0);

      currentGame.players.forEach((player: TPlayer) => {
        drawPlayerSnake(player, ctx);
      });
    };

    drawMapLoop();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);

      if (loopId) {
        cancelAnimationFrame(loopId);
      }
    };
  }, [currentGame]);

  const sendCoordsLoop = () => {
    if (currentGame) {
      socket.emit('changeCursorPosition', {
        roomId: currentGame.roomId,
        playerId: currentUser.id,
        coords: {
          x: cursorPosition.x,
          y: cursorPosition.y,
        },
      });
    }
  };

  const intervalId = setInterval(sendCoordsLoop, 30);

  useEffect(() => {
    socket.on('movedSnakes', (game: TGame) => {
      currentGame = game;
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
    </>
  );
};

const FOOD_SHADOW_SIZE = 14;

// Создает элемент еды для змейки TODO: вынести
export const makeFoodItem = (color: TFoodColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = FOOD_SIZE * 2;
  canvas.height = FOOD_SIZE * 2;

  let muiColor;

  switch (color) {
    case 'blue':
      muiColor = blue;
      break;
    case 'green':
      muiColor = green;
      break;
    case 'yellow':
      muiColor = yellow;
      break;
    case 'red':
      muiColor = red;
      break;
    default:
      muiColor = red;
  }

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = muiColor['700'];
  ctx.shadowColor = muiColor['50'];
  ctx.shadowBlur = FOOD_SHADOW_SIZE;

  ctx.beginPath();
  ctx.arc(canvas.width * 0.5, canvas.height * 0.5, FOOD_SIZE - FOOD_SHADOW_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  return canvas;
};

function drawPlayerSnake(player: TPlayer, ctx: CanvasRenderingContext2D) {
  let count = 1;

  // Отрисовываем элементы хвоста, начиная с конца
  for (let i = player.segments.length - 1; i > 0; i--) {
    count = count + 1;
    const segment = player.segments[i - 1];
    const { x, y } = segment;
    drawSegment(Math.ceil(x), Math.ceil(y), ctx, player.color, count);
  }

  // Отрисовываем голову
  drawSegment(player.headCoords.x, player.headCoords.y, ctx, player.color);

  drawEyes(player, ctx);
}

function drawSegment(x: number, y: number, ctx: CanvasRenderingContext2D, color: TSnakeColor, count?: number) {
  const startX = x - SEGMENT_SIZE;
  const startY = y - SEGMENT_SIZE;
  const width = SEGMENT_SIZE * 2;
  const height = SEGMENT_SIZE * 2;
  ctx.drawImage(makeSnakeSegment(SEGMENT_SIZE, color, count), startX, startY, width, height);
}

function drawEyes(player: TPlayer, ctx: CanvasRenderingContext2D) {
  const deltaAngle = Math.atan2(player.headCoords.y - player.segments[1].y, player.headCoords.x - player.segments[1].x);

  const EYE_SIZE = 0.3; // размер глаза
  const PUPIL_SIZE = EYE_SIZE * 0.7; // размер зрачка
  const DISTANCE_BETWEEN_YEYS = SEGMENT_SIZE / 4;

  const eye_x = Math.cos(deltaAngle) * SEGMENT_SIZE * EYE_SIZE;
  const eye_y = Math.sin(deltaAngle) * SEGMENT_SIZE * EYE_SIZE;

  ctx.save();
  ctx.translate(player.headCoords.x + eye_x, player.headCoords.y + eye_y);

  ctx.beginPath();
  ctx.arc(eye_x - DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * EYE_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(eye_x + DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * EYE_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(eye_x - DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * PUPIL_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#000000';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(eye_x + DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * PUPIL_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
