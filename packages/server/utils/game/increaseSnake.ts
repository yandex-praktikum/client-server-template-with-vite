import type { TPlayer } from '../../../shared/types';

export const increaseSnake = (player: TPlayer) => {
  const { segments } = player;

  const lastSegment = segments[segments.length - 1];
  player.segments = [...segments, lastSegment];
};
