import { MAP_HEIGHT, MAP_WIDTH } from '../../../../shared/consts';

export const drawMap = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  ctx.fillStyle = '#1c1c1c'; // фон карты
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
};
