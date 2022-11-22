import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CLIENT_SOCKET_DELAY,
  FOOD_SIZE,
  INITIAL_CURSOR_POSITION,
  MAP_HEIGHT,
  MAP_WIDTH,
} from '../../../../../shared/consts';
import type { TGame, TPlayer, TPosition } from '../../../../../shared/types';
import { SNAKE_REDUCTION_TIME } from '../../../consts/settings';
import { useGetUserQuery } from '../../../services/redux/queries/user.api';
import { useAppSelector } from '../../../services/redux/store';
import { socket } from '../../../services/socket/socket';
import { fixPositionForMap } from '../../../utils/fixPositionForMap';
import { drawMap } from '../../drawers/drawMap';
import { drawPlayerSnake } from '../../drawers/drawPlayerSnake';
import { makeCountDownClock } from '../../makers/makeCountDownClock';
import { makeFoodItem } from '../../makers/makeFoodItem';

export const MultiGameCanvas = () => {
  const { data: currentUser } = useGetUserQuery();

  const cursorPosition = useRef<TPosition>({ ...INITIAL_CURSOR_POSITION });

  let { currentGame } = useAppSelector(state => state.common);

  const ref = useRef<HTMLCanvasElement>(null);
  let loopId: number | null = null;

  const navigate = useNavigate();

  let boost = false;

  let mouseIntervalId: NodeJS.Timer | null = null;

  function onMouseMove(e: MouseEvent) {
    if (mouseIntervalId) {
      clearInterval(mouseIntervalId);
    }

    mouseIntervalId = setInterval(() => {
      if (currentGame && currentUser) {
        socket.emit('decreaseSnake', currentGame.roomId, currentUser);
      }
    }, SNAKE_REDUCTION_TIME);

    if (!currentGame) {
      return;
    }

    if (!ref.current) {
      throw Error('Not found canvas');
    }

    cursorPosition.current = fixPositionForMap({
      x: Math.ceil(e.clientX - ref.current.getBoundingClientRect().left),
      y: Math.ceil(e.clientY - ref.current.getBoundingClientRect().top),
    });
  }

  function onMouseDown() {
    boost = true;
  }

  function onMouseUp() {
    boost = false;
  }

  const { canvas: countDownClock, cancelTimer: cancelCountDownClockTimer } = makeCountDownClock(
    MAP_WIDTH,
    MAP_HEIGHT,
    () => {
      onEnd();

      if (currentGame) {
        socket.emit('finish', currentGame.roomId);
      }

      alert(`Finished. Scores: ${currentGame?.players.map(p => p.segments.length).join(' ')}`);
      navigate('/', { replace: true });
    }
  );

  useEffect(() => {
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

    const drawMapLoop = () => {
      loopId = requestAnimationFrame(drawMapLoop);

      // очищаем все и рисуем карту заново
      drawMap(ctx);
      ctx.drawImage(countDownClock, 0, 0);

      if (currentGame) {
        ctx.drawImage(
          makeFoodItem(currentGame.food.color),
          currentGame.food.position.x - FOOD_SIZE / 2,
          currentGame.food.position.y - FOOD_SIZE / 2
        );
        currentGame.players.forEach((player: TPlayer) => {
          drawPlayerSnake(player, ctx);
        });
      }
    };

    drawMapLoop();

    return onEnd;
  }, [currentGame]);

  const sendCoordsLoop = () => {
    if (currentGame && currentUser) {
      socket.emit('changeCursorPosition', {
        roomId: currentGame.roomId,
        playerId: currentUser.id,
        coords: cursorPosition.current,
        isBoost: boost,
      });
    }
  };

  const intervalId = setInterval(sendCoordsLoop, CLIENT_SOCKET_DELAY);

  useEffect(() => {
    socket.on('changedRoom', (game: TGame) => {
      currentGame = game;
    });

    if (!currentGame) {
      navigate('/create-or-join-game', { replace: true });
    }

    return onEnd;
  }, []);

  function onEnd() {
    socket.off('changedRoom');

    if (loopId) {
      cancelAnimationFrame(loopId);
    }

    cancelCountDownClockTimer();

    document.removeEventListener('mousemove', onMouseMove);
    clearInterval(intervalId);

    if (mouseIntervalId) {
      clearInterval(mouseIntervalId);
    }
  }

  return (
    <>
      <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
    </>
  );
};
