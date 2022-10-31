import type { TFoodColor } from './color';
import type { TGameStatus } from './gameStatus';
import type { TPlayer } from './player';
import type { TPosition } from './position';

export type TGame = {
  roomId: string;
  status: TGameStatus;
  intervalId?: NodeJS.Timer;
  players: TPlayer[];
  food: {
    position: TPosition;
    color: TFoodColor;
  };
};

export type TGames = {
  [key: string]: TGame;
};
