import type { Socket } from 'socket.io';

import {
  SNAKE_COLORS,
  INITIAL_CURSOR_POSITION,
  INITIAL_PLAYER_POSITIONS,
  MAP_HEIGHT,
  MAP_WIDTH,
  MAX_PLAYERS_IN_ROOM,
  FOOD_COLORS,
} from '../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGame, TGames } from '../../shared/types';
import { getRandomItem } from '../utils/common/getRandomItem';
import { makeid } from '../utils/common/makeId';
import { makeRandomPosition } from '../utils/common/makeRandomPosition';

export const addCreateRoomEvent = (socket: Socket<IClientToServerEvents, IServerToClientEvents>, games: TGames) => {
  socket.on('createRoom', userCreator => {
    // TODO: другая константа должна быть
    const roomId = makeid(MAX_PLAYERS_IN_ROOM);
    const initialPosition = INITIAL_PLAYER_POSITIONS[0];
    const newGame: TGame = {
      roomId: roomId,
      status: 'waiting',
      food: {
        // TODO: 50 - вынести в константу и проверить где еще есть 50, либо флаг withMargin
        position: makeRandomPosition(MAP_WIDTH, MAP_HEIGHT, 50),
        color: getRandomItem(FOOD_COLORS),
      },
      players: [
        {
          color: SNAKE_COLORS[0],
          isHost: true,
          isBoost: false,
          user: userCreator,
          segments: [{ ...initialPosition }, { ...initialPosition }],
          cursorPosition: INITIAL_CURSOR_POSITION,
          headCoords: { ...initialPosition },
        },
      ],
    };
    games[roomId] = newGame;

    // TODO: emit для всех игроков в одну строчку
    socket.join(roomId);
    socket.emit('createdRoom', newGame);
  });
};
