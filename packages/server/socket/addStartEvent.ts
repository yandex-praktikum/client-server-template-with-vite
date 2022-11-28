import type { Socket } from 'socket.io';
import type socketIo from 'socket.io';

import { MAX_PLAYERS_IN_ROOM, SOCKET_ERRORS } from '../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGame, TGames } from '../../shared/types';
import { runEmitCoordsLoop } from '../utils/game/runEmitCoordsLoop';

export const addStartEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
  games: TGames,
  io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>
) => {
  socket.on('start', (roomId: TGame['roomId']) => {
    const game = games[roomId];

    if (!game) {
      socket.emit('error', SOCKET_ERRORS.GAME_NOT_FOUND);
    } else if (game.players.length < 2) {
      socket.emit('error', SOCKET_ERRORS.NOT_ENOUGH_PLAYERS);
    } else if (game.players.length > MAX_PLAYERS_IN_ROOM) {
      socket.emit('error', SOCKET_ERRORS.NOT_ENOUGH_PLAYERS);
    } else {
      game.status = 'in_process';

      io.in(game.roomId).emit('started', game);

      // запускает отправку текущих данных об игре каждый интервал времени
      runEmitCoordsLoop(io, game, games);
    }
  });
};
