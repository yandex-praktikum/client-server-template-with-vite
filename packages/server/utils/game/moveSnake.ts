import { BOOST_SPEED, SIZE_BETWEEN_SEGMENTS, SPEED } from '../../../shared/consts';
import type { TPlayer } from '../../../shared/types';
import { getDistanceBetweenTwoPoints } from '../../../shared/utils';

// TODO: отрефакторить и вынести в общую функцию для бэка и фронта

export const moveSnake = (player: TPlayer): void => {
  const { segments, cursorPosition, isBoost, headCoords } = player;

  const distanceToMouse = getDistanceBetweenTwoPoints(headCoords, cursorPosition);

  // Если голова достигла курсора мыши, то змейка останавливается и пересчитывать ее кординаты не нужно
  if (distanceToMouse < 10) {
    return;
  }

  const speed = isBoost ? BOOST_SPEED : SPEED;

  // Вычисления по формулам для нахождения прямой от головы змейки до курсора
  // На этой прямой находятся координаты x и y для следующего шага змейки
  const deltaAngle = Math.atan2(cursorPosition.y - headCoords.y, cursorPosition.x - headCoords.x);
  // console.log({ berfore: headCoords });

  headCoords.x = headCoords.x + Math.cos(deltaAngle) * speed;
  headCoords.y = headCoords.y + Math.sin(deltaAngle) * speed;
  // console.log({ after: headCoords, segment: segments[0] });

  const distanceFromHeadToTail = getDistanceBetweenTwoPoints(segments[0], headCoords);

  // Если голова змейки не прошла необходимое минимальное расстояние,
  // то элементы хвоста змеи оставляем на тех же местах

  if (distanceFromHeadToTail < SIZE_BETWEEN_SEGMENTS) {
    return;
  } else {
    // Иначе смещаем каждый элемент змейки ближе к голове
    const newSegments = [];

    for (let i = 1; i < segments.length; i++) {
      const cur = segments[i];
      const prev = segments[i - 1];

      const distance = getDistanceBetweenTwoPoints(prev, cur);

      if (distance >= SIZE_BETWEEN_SEGMENTS) {
        newSegments.push({
          x: prev.x,
          y: prev.y,
        });
      } else {
        newSegments.push({
          x: cur.x,
          y: cur.y,
        });
      }
    }

    player.segments = [{ ...headCoords }, ...newSegments];
  }
};
