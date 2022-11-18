import type { TSnakeColor } from './color';
import type { TPosition } from './position';

import type { TUser } from '../apiTypes';

export type TPlayer = {
  user: TUser;
  isHost: boolean;
  color: TSnakeColor;
  cursorPosition: TPosition;
  headCoords: TPosition;
  segments: TPosition[];
  isBoost: boolean;
};
