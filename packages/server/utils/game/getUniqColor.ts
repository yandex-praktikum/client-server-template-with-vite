import { SNAKE_COLORS } from '../../../shared/consts';
import type { TGame, TSnakeColor } from '../../../shared/types';

export const getUniqColor = (game: TGame): TSnakeColor => {
  const usedColors = game.players.map(p => p.color);
  const unusedColors = SNAKE_COLORS.filter(color => !usedColors.includes(color));

  return unusedColors[0];
};
