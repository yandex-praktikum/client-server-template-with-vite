import { blue, green, yellow, red } from '@material-ui/core/colors';

// TODO: тип из шеред
import { TSnakeColor } from '../Snake.types';

// TODO: вынести в utils + описать
// TODO: тип для hexCode - есть ли такой тип?
const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

// Создает рисунок одного кружочка змейки
export const makeSnakeSegment = (size: number, color: TSnakeColor, count?: number) => {
  // TODO: константа в настройки змеи
  const SHADOW_SIZE = 6;

  const canvas = document.createElement('canvas');
  canvas.width = size * 2;
  canvas.height = size * 2;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  switch (color) {
    case 'blue':
      ctx.fillStyle = blue.A100;
      break;
    case 'red':
      ctx.fillStyle = red.A100;
      break;
    case 'yellow':
      ctx.fillStyle = yellow.A100;
      break;
    case 'green':
      ctx.fillStyle = green.A200;
      break;
    default:
      ctx.fillStyle = color;
  }

  // TODO: переписать на более понятное
  const opacity = count ? ((count || 10) < 10 ? count * 0.1 : 1) : 1;

  // TODO: черный просто или с опасити или какой лучше?
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

  return canvas;
};
