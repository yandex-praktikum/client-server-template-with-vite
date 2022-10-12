import { blue, green, yellow, red } from '@material-ui/core/colors';

const FOOD_SIZE = 20;
const FOOD_COLORS = [blue, green, yellow, red];
const FOOD_SHADOW_SIZE = 14;

// Создает элемент еды для змейки
export const makeFoodItem = (mapWidth: number, mapHeight: number, margin = 50) => {
  const canvas = document.createElement('canvas');
  canvas.width = FOOD_SIZE * 2;
  canvas.height = FOOD_SIZE * 2;

  const randomColorIndex = Math.floor(Math.random() * FOOD_COLORS.length);

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = FOOD_COLORS[randomColorIndex]['700'];
  ctx.shadowColor = FOOD_COLORS[randomColorIndex]['50'];
  ctx.shadowBlur = FOOD_SHADOW_SIZE;

  ctx.beginPath();
  ctx.arc(canvas.width * 0.5, canvas.height * 0.5, FOOD_SIZE - FOOD_SHADOW_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const x = randomIntFromInterval(margin, mapWidth - margin);
  const y = randomIntFromInterval(margin, mapHeight - margin);

  return { foodImg: canvas, foodX: x, foodY: y };
};
