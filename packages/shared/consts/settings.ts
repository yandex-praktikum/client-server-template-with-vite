import type { TPosition, TSnakeColor } from '../types';

export const MAP_WIDTH = 1200;
export const MAP_HEIGHT = 800;

export const MAX_PLAYERS_IN_ROOM = 4;

export const GAME_DURATION_MS = 60 * 1000;

export const ROOM_CODE_LENGTH = 4;

export const ROOM_CODE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const SERVER_SOCKET_DELAY = 30;
export const CLIENT_SOCKET_DELAY = 10;

const OFFSET = 20;

export const INITIAL_PLAYER_POSITIONS: { [key in TSnakeColor]: TPosition } = {
  red: { x: OFFSET, y: OFFSET },
  green: { x: MAP_WIDTH - OFFSET, y: MAP_HEIGHT - OFFSET },
  yellow: { x: OFFSET, y: MAP_HEIGHT - OFFSET },
  blue: { x: MAP_WIDTH - OFFSET, y: OFFSET },
};

export const INITIAL_CURSOR_POSITION: TPosition = {
  x: MAP_WIDTH / 2,
  y: MAP_HEIGHT / 2,
};
