import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { CLIENT_SOCKET_DELAY, INITIAL_CURSOR_POSITION, MAP_HEIGHT, MAP_WIDTH } from '../../../../../shared/consts';
import type { TGame, TPlayer, TPosition } from '../../../../../shared/types';
import { socket } from '../../../services/socket/socket';
import { useAppSelector } from '../../../store/hooks';
import { fixPositionForMap } from '../../../utils/fixPositionForMap';
import { drawMap } from '../../drawers/drawMap';
import { drawPlayerSnake } from '../../drawers/drawPlayerSnake';
import { makeCountDownClock } from '../../makers/makeCountDownClock';
import { makeFoodItem } from '../../makers/makeFoodItem';

export const MultiGameCanvas = () => {
  let cursorPosition: TPosition = { ...INITIAL_CURSOR_POSITION };

  let { currentGame } = useAppSelector(state => state.common);
  const { currentUser } = useAppSelector(state => state.common);

  const ref = useRef<HTMLCanvasElement>(null);
  let loopId: number | null = null;

  const navigate = useNavigate();

  if (!currentGame) {
    navigate('/create-or-join-game');

    return null;
  }

  let boost = false;

  function onMouseMove(e: MouseEvent) {
    if (!currentGame) {
      return;
    }

    if (!ref.current) {
      throw Error('Not found canvas');
    }

    cursorPosition = fixPositionForMap({
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
      // todo: сделать красивое завершение игры
      alert(`Finished. Scores: ${currentGame?.players.map(p => p.segments.length).join(' ')}`);
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
        ctx.drawImage(makeFoodItem(currentGame.food.color), currentGame.food.position.x, currentGame.food.position.y);
        currentGame.players.forEach((player: TPlayer) => {
          drawPlayerSnake(player, ctx);
        });
      }
    };

    drawMapLoop();

    return onEnd;
  }, [currentGame]);

  const sendCoordsLoop = () => {
    if (currentGame) {
      socket.emit('changeCursorPosition', {
        roomId: currentGame.roomId,
        playerId: currentUser.id,
        coords: cursorPosition,
        isBoost: boost,
      });
    }
  };

  const intervalId = setInterval(sendCoordsLoop, CLIENT_SOCKET_DELAY);

  useEffect(() => {
    socket.on('movedSnakes', (game: TGame) => {
      currentGame = game;
    });

    return onEnd;
  }, []);

  function onEnd() {
    if (loopId) {
      cancelAnimationFrame(loopId);
    }

    cancelCountDownClockTimer();

    document.removeEventListener('mousemove', onMouseMove);
    clearInterval(intervalId);
  }

  return (
    <>
      <canvas ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} />
    </>
  );
};
