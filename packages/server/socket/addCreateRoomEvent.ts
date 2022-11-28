import type { Socket } from 'socket.io';
import type socketIo from 'socket.io';

import {
  SNAKE_COLORS,
  INITIAL_CURSOR_POSITION,
  INITIAL_PLAYER_POSITIONS,
  MAP_HEIGHT,
  MAP_WIDTH,
  FOOD_COLORS,
  ROOM_CODE_LENGTH,
  SOCKET_ERRORS,
  ROOM_CODE_CHARACTERS,
} from '../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGame, TGames } from '../../shared/types';
import { getRandomItem } from '../../shared/utils/getRandomItem';
import { makeId } from '../utils/common/makeId';
import { makeRandomPosition } from '../utils/common/makeRandomPosition';

export const addCreateRoomEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
  games: TGames,
  io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>
) => {
  socket.on('createRoom', userCreator => {
    const roomId = makeId(ROOM_CODE_CHARACTERS, ROOM_CODE_LENGTH);

    if (games[roomId]) {
      socket.emit('error', SOCKET_ERRORS.ROOM_ALREADY_EXISTS);

      return;
    }

    const color = SNAKE_COLORS[0];
    const initialPosition = INITIAL_PLAYER_POSITIONS[color];
    const newGame: TGame = {
      roomId: roomId,
      status: 'waiting',
      food: {
        position: makeRandomPosition(MAP_WIDTH, MAP_HEIGHT, 50),
        color: getRandomItem(FOOD_COLORS),
      },
      players: [
        {
          color,
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

    socket.join(roomId);
    io.in(roomId).emit('createdRoom', newGame);

    socket.on('disconnect', () => {
      if (newGame.players.length > 1) {
        const changedGame: TGame = { ...newGame, players: newGame.players.filter(p => p.user.id !== userCreator.id) };
        changedGame.players[0].isHost = true;
        games[roomId] = changedGame;
        io.to(roomId).emit('joinedRoom', changedGame);
      } else {
        const intervalId = games[roomId]?.intervalId;
        clearInterval(intervalId);
        delete games[roomId];
      }
    });
  });
};
