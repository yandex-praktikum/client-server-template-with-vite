import { SEGMENT_SIZE } from '../../../../shared/consts';
import { TPlayer } from '../../../../shared/types';

export function drawEyes(params: Pick<TPlayer, 'headCoords' | 'segments'>, ctx: CanvasRenderingContext2D) {
  const { headCoords, segments } = params;

  const deltaAngle = Math.atan2(headCoords.y - segments[1].y, headCoords.x - segments[1].x);

  const EYE_SIZE = 0.3; // размер глаза
  const PUPIL_SIZE = EYE_SIZE * 0.7; // размер зрачка
  const DISTANCE_BETWEEN_YEYS = SEGMENT_SIZE / 4;

  const eye_x = Math.cos(deltaAngle) * SEGMENT_SIZE * EYE_SIZE;
  const eye_y = Math.sin(deltaAngle) * SEGMENT_SIZE * EYE_SIZE;

  ctx.save();
  ctx.translate(headCoords.x + eye_x, headCoords.y + eye_y);

  ctx.beginPath();
  ctx.arc(eye_x - DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * EYE_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(eye_x + DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * EYE_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(eye_x - DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * PUPIL_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#000000';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(eye_x + DISTANCE_BETWEEN_YEYS, eye_y, SEGMENT_SIZE * PUPIL_SIZE, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
