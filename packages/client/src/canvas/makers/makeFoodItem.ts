import { FOOD_SIZE } from '../../../../shared/consts';
import { TFoodColor } from '../../../../shared/types';
import { PRETTY_FOOD_COLORS } from '../../consts/prettyFoodColors';
import { convertHexToRGBA } from '../../utils/convertHexToRGBA';

const FOOD_SHADOW_SIZE = 14;

/** Создает рисунок еды (в виде кружочка) */
export const makeFoodItem = (color: TFoodColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = FOOD_SIZE * 2;
  canvas.height = FOOD_SIZE * 2;

  const foodColor = PRETTY_FOOD_COLORS[color];

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = foodColor;

  ctx.shadowColor = convertHexToRGBA(foodColor, 0.2);
  ctx.shadowBlur = FOOD_SHADOW_SIZE;

  ctx.beginPath();
  ctx.arc(canvas.width * 0.5, canvas.height * 0.5, FOOD_SIZE - FOOD_SHADOW_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  return canvas;
};
