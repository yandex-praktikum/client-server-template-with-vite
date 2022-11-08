import { TSnakeColor } from '../../../../shared/types';
import { PRETTY_SNAKE_COLORS } from '../../consts/prettySnakeColors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

const cashed: { [key: string]: HTMLCanvasElement } = {};

/** Создает рисунок одного кружочка змейки */
export const makeSnakeSegment = (size: number, color: TSnakeColor, opacity: number) => {
  const cacheKey = `${size}-${color}-${opacity}`;

  if (cashed[cacheKey]) {
    return cashed[cacheKey];
  }

  const SHADOW_SIZE = 6;

  const canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = PRETTY_SNAKE_COLORS[color];

  ctx.strokeStyle = convertHexToRGBA('#000000', opacity);
  ctx.lineWidth = 2;

  ctx.shadowColor = 'black';
  ctx.shadowBlur = SHADOW_SIZE;

  ctx.fillStyle = convertHexToRGBA(ctx.fillStyle, opacity);

  ctx.beginPath();
  ctx.arc(canvas.width * 0.5, canvas.height * 0.5, size - SHADOW_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  cashed[cacheKey] = canvas;

  return canvas;
};
