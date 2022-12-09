import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  CLIENT_SOCKET_DELAY,
  FOOD_SIZE,
  GAME_DURATION_MS,
  INITIAL_CURSOR_POSITION,
  MAP_HEIGHT,
  MAP_WIDTH,
} from '../../../../../shared/consts';
import type { TGame, TPlayer, TPosition } from '../../../../../shared/types';
import CursorPng from '../../../assets/cursor.png';
import { SNAKE_REDUCTION_TIME } from '../../../consts/settings';
import { setGame, setLastScore } from '../../../services/redux/reducers/common.reducer';
import { getUserSelector } from '../../../services/redux/selectors/getUserSelector';
import { useAppDispatch, useAppSelector } from '../../../services/redux/store';
import { socket } from '../../../services/socket/socket';
import { fixPositionForMap } from '../../../utils/fixPositionForMap';
import { drawMap } from '../../drawers/drawMap';
import { drawPlayerSnake } from '../../drawers/drawPlayerSnake';
import { makeCountDownClock } from '../../makers/makeCountDownClock';
import { makeFoodItem } from '../../makers/makeFoodItem';

export const MultiGameCanvas = () => {
  const { data: currentUser } = useAppSelector(getUserSelector);

  const dispatch = useAppDispatch();

  const cursorPosition = useRef<TPosition>({ ...INITIAL_CURSOR_POSITION });

  const { currentGame: initialGame } = useAppSelector(state => state.common);

  const currentGame = useRef<TGame | null>(initialGame);

  const ref = useRef<HTMLCanvasElement>(null);
  const loopId = useRef<number | null>(null);
  const mouseIntervalId = useRef<NodeJS.Timer | null>(null);
  const intervalId = useRef<NodeJS.Timer | null>(null);

  const navigate = useNavigate();

  const boost = useRef<boolean>(false);

  function onMouseMove(e: MouseEvent) {
    if (mouseIntervalId.current) {
      clearInterval(mouseIntervalId.current);
    }

    mouseIntervalId.current = setInterval(() => {
      if (currentGame.current && currentUser) {
        socket.emit('decreaseSnake', currentGame.current.roomId, currentUser);
      }
    }, SNAKE_REDUCTION_TIME);

    if (!currentGame.current) {
      return;
    }

    if (!ref.current) {
      onEnd();

      throw Error('Not found canvas');
    }

    cursorPosition.current = fixPositionForMap({
      x: Math.ceil(e.clientX - ref.current.getBoundingClientRect().left),
      y: Math.ceil(e.clientY - ref.current.getBoundingClientRect().top),
    });
  }

  function onMouseDown() {
    boost.current = true;
  }

  function onMouseUp() {
    boost.current = false;
  }

  const { canvas: countDownClock, cancelTimer: cancelCountDownClockTimer } = useMemo(() => {
    return makeCountDownClock(MAP_WIDTH, MAP_HEIGHT);
  }, [currentGame.current?.roomId]);

  const sendCoordsLoop = () => {
    if (currentGame.current && currentUser) {
      socket.emit('changeCursorPosition', {
        roomId: currentGame.current.roomId,
        playerId: currentUser.id,
        coords: cursorPosition.current,
        isBoost: boost.current,
      });
    }
  };

  useEffect(() => {
    socket.on('changedRoom', (game: TGame) => {
      currentGame.current = game;
    });
    socket.on('error', () => {
      onEnd();
    });

    socket.on('finished', () => {
      dispatch(
        setLastScore(
          currentGame.current?.players.map(({ segments, user, color }) => ({
            id: user.id,
            login: user.login || user.display_name || user.first_name,
            points: segments.length,
            color,
          })) || null
        )
      );
      navigate('/leaderboard');
      onEnd();
    });

    if (!currentGame.current) {
      navigate('/create-or-join-game', { replace: true });
    }

    return onEnd;
  }, []);

  function onEnd() {
    socket.off('changedRoom');
    socket.off('finished');

    document.removeEventListener('mousemove', onMouseMove);
    cancelCountDownClockTimer();

    if (loopId.current) {
      cancelAnimationFrame(loopId.current);
    }

    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    if (mouseIntervalId.current) {
      clearInterval(mouseIntervalId.current);
    }

    dispatch(setGame(null));
  }

  useEffect(() => {
    if (!currentGame.current) {
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
      loopId.current = requestAnimationFrame(drawMapLoop);

      // очищаем все и рисуем карту заново
      drawMap(ctx);
      ctx.drawImage(countDownClock, 0, 0);

      if (currentGame.current) {
        ctx.drawImage(
          makeFoodItem(currentGame.current.food.color),
          currentGame.current.food.position.x - FOOD_SIZE / 2,
          currentGame.current.food.position.y - FOOD_SIZE / 2
        );

        currentGame.current.players.forEach((player: TPlayer) => {
          drawPlayerSnake(player, ctx);
        });
      }
    };

    drawMapLoop();
  }, [currentGame.current]);

  intervalId.current = setInterval(sendCoordsLoop, CLIENT_SOCKET_DELAY);
  setTimeout(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, GAME_DURATION_MS);

  return (
    <>
      <canvas
        ref={ref}
        style={{
          cursor: `url(${CursorPng}) 24 24, default`,
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </>
  );
};
