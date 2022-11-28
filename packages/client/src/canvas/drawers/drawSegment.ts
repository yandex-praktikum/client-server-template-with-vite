import { SEGMENT_SIZE } from '../../../../shared/consts';
import { TSnakeColor } from '../../../../shared/types';
import { makeSnakeSegment } from '../makers/makeSnakeSegment';

export function drawSegment(x: number, y: number, ctx: CanvasRenderingContext2D, color: TSnakeColor, count?: number) {
  const startX = x - SEGMENT_SIZE;
  const startY = y - SEGMENT_SIZE;
  const width = SEGMENT_SIZE * 2;
  const height = SEGMENT_SIZE * 2;

  // для прозрачности хвоста, чем дальше от головы, тем выше прозрачность
  const opacity = count ? ((count || 10) < 10 ? count * 0.1 : 1) : 1;

  ctx.drawImage(makeSnakeSegment(SEGMENT_SIZE, color, opacity), startX, startY, width, height);
}
