import type { Socket } from 'socket.io';
import type socketIo from 'socket.io';

import {
  INITIAL_CURSOR_POSITION,
  INITIAL_PLAYER_POSITIONS,
  SOCKET_ERRORS,
  MAX_PLAYERS_IN_ROOM,
} from '../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGames, TPlayer } from '../../shared/types';
import { getUniqColor } from '../utils/game/getUniqColor';

export const addJoinRoomEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
  games: TGames,
  io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>
) => {
  socket.on('joinRoom', (roomId, player) => {
    const game = games[roomId];

    if (!game) {
      socket.emit('error', SOCKET_ERRORS.GAME_NOT_FOUND);
    } else if (game.players.find(p => p.user.id === player.id) !== undefined) {
      socket.emit('error', SOCKET_ERRORS.ALREADY_JOINED_THE_GAME);
    } else if (game.players.length >= MAX_PLAYERS_IN_ROOM) {
      socket.emit('error', SOCKET_ERRORS.TOO_MANY_PLAYERS);
    } else if (game.status !== 'waiting') {
      socket.emit('error', SOCKET_ERRORS.THE_GAME_ALREADY_STARTED);
    } else {
      const color = getUniqColor(game);
      const initPlayerPosition = INITIAL_PLAYER_POSITIONS[color];
      const newPlayer: TPlayer = {
        color,
        isHost: false,
        isBoost: false,
        user: player,
        cursorPosition: INITIAL_CURSOR_POSITION,
        segments: [{ ...initPlayerPosition }, { ...initPlayerPosition }],
        headCoords: { ...initPlayerPosition },
      };
      game.players.push(newPlayer);
      socket.join(game.roomId);

      io.in(game.roomId).emit('joinedRoom', game);

      socket.on('disconnect', () => {
        if (game.players.length > 1) {
          games[roomId] = { ...game, players: game.players.filter(p => p.user.id !== player.id) };

          io.to(roomId).emit('joinedRoom', games[roomId]);
        } else {
          const intervalId = games[roomId]?.intervalId;
          clearInterval(intervalId);
          delete games[roomId];
        }
      });
    }
  });
};
