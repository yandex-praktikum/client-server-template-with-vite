import { MAP_HEIGHT, MAP_WIDTH } from '../../../shared/consts';
import { TPosition } from '../../../shared/types';

/** Возвращает исправленную позицию курсора мыши, чтобы курсор не выходил за пределы карты */
export const fixPositionForMap = (cursorPosition: TPosition): TPosition => {
  const fixedCursorPostion = { ...cursorPosition };

  if (fixedCursorPostion.x < 0) {
    fixedCursorPostion.x = 0;
  }

  if (fixedCursorPostion.x > MAP_WIDTH) {
    fixedCursorPostion.x = MAP_WIDTH;
  }

  if (fixedCursorPostion.y < 0) {
    fixedCursorPostion.y = 0;
  }

  if (fixedCursorPostion.y > MAP_HEIGHT) {
    fixedCursorPostion.y = MAP_HEIGHT;
  }

  return fixedCursorPostion;
};
