import type { TPosition } from '../../../shared/types';

// TODO: добавить описание функции и тип возвращаемого значения
export const getDistanceBetweenTwoPoints = (first: TPosition, second: TPosition) => {
  return Math.sqrt((second.x - first.x) ** 2 + (second.y - first.y) ** 2);
};
