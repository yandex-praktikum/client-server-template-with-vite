import { MAP_HEIGHT, MAP_WIDTH } from '../../../shared/consts';
import { TPosition } from '../../../shared/types';

/** Возвращает исправленную позицию курсора мыши, чтобы курсор не выходил за пределы карты */
export const fixPositionForMap = (cursorPosition: TPosition): TPosition => {
  const fixedCursorPosition = { ...cursorPosition };

  if (fixedCursorPosition.x < 0) {
    fixedCursorPosition.x = 0;
  }

  if (fixedCursorPosition.x > MAP_WIDTH) {
    fixedCursorPosition.x = MAP_WIDTH;
  }

  if (fixedCursorPosition.y < 0) {
    fixedCursorPosition.y = 0;
  }

  if (fixedCursorPosition.y > MAP_HEIGHT) {
    fixedCursorPosition.y = MAP_HEIGHT;
  }

  return fixedCursorPosition;
};
