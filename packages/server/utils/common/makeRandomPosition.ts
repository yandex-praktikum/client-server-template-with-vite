import { makeRandomIntFromInterval } from './makeRandomIntFromInterval';

import type { TPosition } from '../../../shared/types';

/** По размерам карты возвращает случайную позицию на ней,
 * insideOffset указывает на внутренний отступ от границ карты */
export const makeRandomPosition = (mapWidth: number, mapHeight: number, insideOffset = 0): TPosition => {
  const x = makeRandomIntFromInterval(insideOffset, mapWidth - insideOffset);
  const y = makeRandomIntFromInterval(insideOffset, mapHeight - insideOffset);

  return { x, y };
};
