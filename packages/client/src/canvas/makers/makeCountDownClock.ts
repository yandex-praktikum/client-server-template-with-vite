import { red, green, yellow } from '@mui/material/colors';

import { GAME_DURATION_MS } from '../../../../shared/consts';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

/** Создает рисунок с линией таймера и кол-вом оставшихся секунд */
export const makeCountDownClock = (mapWidth: number, mapHeight: number, onTimeOut?: () => void) => {
  let timerId: NodeJS.Timeout | null;
  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const dateStart = new Date();
  const dateStartMs = dateStart.getTime();

  const changeCountDown = () => {
    timerId = setTimeout(() => {
      const dateNow = new Date();
      const dateNowMs = dateNow.getTime();

      const remainingMs = Math.ceil(GAME_DURATION_MS - (dateNowMs - dateStartMs));
      const remainingSeconds = Math.ceil(remainingMs / 1000);
      const remainingSecondsStr =
        remainingSeconds >= 10 ? remainingSeconds.toString() : '0' + remainingSeconds.toString();

      ctx.clearRect(0, 0, mapWidth, mapHeight);

      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.font = `bold ${mapHeight * 0.8}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(remainingSecondsStr, mapWidth / 2, mapHeight * 0.8);

      const OPACITY = 0.3;
      const gradientBack = ctx.createLinearGradient(0, 0, mapWidth, 0);
      gradientBack.addColorStop(0, convertHexToRGBA(red['900'], OPACITY));
      gradientBack.addColorStop(0.5, convertHexToRGBA(yellow['900'], OPACITY));
      gradientBack.addColorStop(1, convertHexToRGBA(green['900'], OPACITY));

      ctx.fillStyle = gradientBack;
      ctx.fillRect(0, 0, mapWidth, 10);

      const gradient = ctx.createLinearGradient(0, 0, mapWidth, 0);
      gradient.addColorStop(0, red['900']);
      gradient.addColorStop(0.5, yellow['900']);
      gradient.addColorStop(1, green['900']);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, ((mapWidth / (GAME_DURATION_MS / 1000)) * remainingMs) / 1000, 10);

      if (remainingMs <= 0) {
        cancelTimer();

        if (onTimeOut) {
          onTimeOut();
        }
      } else {
        changeCountDown();
      }
    }, 50);
  };

  changeCountDown();

  function cancelTimer() {
    if (timerId) {
      clearTimeout(timerId);
    }
  }

  return { canvas, cancelTimer };
};
