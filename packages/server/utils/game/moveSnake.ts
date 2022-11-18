import { BOOST_SPEED, SPEED, SIZE_BETWEEN_SEGMENTS } from '../../../shared/consts';
import type { TPlayer } from '../../../shared/types';
import { getDistanceBetweenTwoPoints } from '../../../shared/utils';

// todo: в будущем можно отрефакторить и вынести общее для одиночного и многопользовательского режима

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

  headCoords.x = headCoords.x + Math.cos(deltaAngle) * speed;
  headCoords.y = headCoords.y + Math.sin(deltaAngle) * speed;

  const distanceFromHeadToTail = getDistanceBetweenTwoPoints(segments[0], headCoords);

  // Если голова змейки не прошла необходимое минимальное расстояние,
  // то элементы хвоста змеи оставляем на тех же местах
  if (distanceFromHeadToTail < SIZE_BETWEEN_SEGMENTS) {
    return;
  } else {
    // Иначе смещаем каждый элемент змейки ближе к голове

    const newSegments = [...player.segments];
    newSegments.pop();
    newSegments.unshift({ ...headCoords });
    player.segments = newSegments;
  }
};
