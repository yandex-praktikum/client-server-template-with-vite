import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStyles } from './useStyles';

import { FOOD_COLORS, FOOD_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../../../../shared/consts';
import { getDistanceBetweenTwoPoints } from '../../../../../shared/utils';
import { getRandomItem } from '../../../../../shared/utils/getRandomItem';
import GameBGImg from '../../../assets/game_bg.jpg';
import { Snake } from '../../../game/Snake';
import { setLastScore } from '../../../services/redux/reducers/common.reducer';
import { useAppDispatch } from '../../../services/redux/store';
import { fixPositionForMap } from '../../../utils/fixPositionForMap';
import { randomIntFromInterval } from '../../../utils/randomIntFromInterfal';
import { makeCountDownClock } from '../../makers/makeCountDownClock';
import { makeFoodItem } from '../../makers/makeFoodItem';

export function SingleGameCanvas() {
  const classes = useStyles();
  const ref = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let loopId: number | null = null;

  let mousePositionX = MAP_WIDTH / 2;
  let mousePositionY = MAP_HEIGHT / 2;
  const boost = useRef<boolean>(false);
  /**
   * Audio web api
   */
  const audioCtx = new window.AudioContext();
  const myAudio = new Audio('./audio/neon-gaming-128925.mp3');
  const source = audioCtx.createMediaElementSource(myAudio);

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
    source.connect(audioCtx.destination);
    myAudio.play();

    let foodX = randomIntFromInterval(50, MAP_WIDTH - 50);
    let foodY = randomIntFromInterval(50, MAP_HEIGHT - 50);
    let foodImg = makeFoodItem(getRandomItem(FOOD_COLORS));

    const changeFoodItem = () => {
      foodX = randomIntFromInterval(50, MAP_WIDTH - 50);
      foodY = randomIntFromInterval(50, MAP_HEIGHT - 50);
      foodImg = makeFoodItem(getRandomItem(FOOD_COLORS));
    };

    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      throw Error('No canvas or context');
    }

    document.addEventListener('mousemove', onMouseMove);

    const snake = new Snake(mousePositionX, mousePositionY, ctx, 'red', 2);

    const { canvas: countDownClock, cancelTimer: cancelCountDownClockTimer } = makeCountDownClock(
      MAP_WIDTH,
      MAP_HEIGHT,
      () => {
        dispatch(
          setLastScore([
            {
              id: null,
              login: null,
              points: snake.segments.length,
              color: null,
            },
          ])
        );
        navigate('/leaderboard');
        onEnd();
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
      ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
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
    <div className={classes.wrapper}>
      <img src={GameBGImg} width={MAP_WIDTH} height={MAP_HEIGHT} />
      <canvas
        ref={ref}
        className={classes.mainCanvas}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </div>
  );
}
