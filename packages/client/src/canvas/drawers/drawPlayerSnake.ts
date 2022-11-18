import { drawEyes } from './drawEyes';
import { drawSegment } from './drawSegment';

import { TPlayer } from '../../../../shared/types';

export function drawPlayerSnake(
  params: Pick<TPlayer, 'segments' | 'headCoords' | 'color'>,
  ctx: CanvasRenderingContext2D
) {
  const { segments, color, headCoords } = params;

  let count = 1;

  // Отрисовываем элементы хвоста, начиная с конца
  for (let i = segments.length - 1; i > 0; i--) {
    count = count + 1;
    const segment = segments[i - 1];
    const { x, y } = segment;
    drawSegment(Math.ceil(x), Math.ceil(y), ctx, color, count);
  }

  // Отрисовываем голову
  drawSegment(headCoords.x, headCoords.y, ctx, color);

  drawEyes({ segments, headCoords }, ctx);
}
