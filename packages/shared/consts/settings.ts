import type { TPosition } from '../types';

export const MAP_WIDTH = 1200;
export const MAP_HEIGHT = 800;

export const MAX_PLAYERS_IN_ROOM = 4;

export const ROOM_CODE_LENGTH = 4;

export const SERVER_SOCKET_DELAY = 30;

// TODO: сделать начальные позиции не с нуля, а с небольшим отступом от границы карты
export const INITIAL_PLAYER_POSITIONS: TPosition[] = [
  { x: 0, y: 0 },
  { x: MAP_WIDTH, y: MAP_HEIGHT },
  { x: 0, y: MAP_HEIGHT },
  { x: MAP_WIDTH, y: 0 },
];

export const INITIAL_CURSOR_POSITION: TPosition = {
  x: MAP_WIDTH / 2,
  y: MAP_HEIGHT / 2,
};
