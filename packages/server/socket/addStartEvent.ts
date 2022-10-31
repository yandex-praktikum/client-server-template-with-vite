import type { Socket } from 'socket.io';
import type socketIo from 'socket.io';

import type { IClientToServerEvents, IServerToClientEvents, TGame, TGames } from '../../shared/types';
import { runEmitCoordsLoop } from '../utils/game/runEmitCoordsLoop';

export const addStartEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
  games: TGames,
  io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>
) => {
  socket.on('start', (roomId: TGame['roomId']) => {
    const game = games[roomId];

    if (game) {
      game.status = 'in_process';

      io.in(game.roomId).emit('started', game);

      // TODO: добавить коммент, что запускает эта функция
      runEmitCoordsLoop(io, game);
    } else {
      // TODO: добавить обработку ошибки, если игры не найдено
      //   если мало игроков
    }
  });
};
