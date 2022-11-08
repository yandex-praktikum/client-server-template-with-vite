import type { TPosition } from '../types';

/** Возвращает дистанцию между 2 точками */
export const getDistanceBetweenTwoPoints = (first: TPosition, second: TPosition): number => {
  return Math.sqrt((second.x - first.x) ** 2 + (second.y - first.y) ** 2);
};
