import type socketIo from 'socket.io';
import type { Socket } from 'socket.io';

import type { IClientToServerEvents, IServerToClientEvents, TGames, TPlayer } from '../../shared/types';

export const addUserDisconnectedEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
  games: TGames,
  io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>
) => {
  socket.on('userDisconnected', (roomId, user) => {
    const game = games[roomId];

    if (game) {
      const isUserWasHost = game.players.find((u: TPlayer) => u.user.id === user.id)?.isHost;
      game.players = game.players.filter(p => p.user.id !== user.id);
      io.in(roomId).emit('changedRoom', game);

      if (isUserWasHost) {
        if (game.players.length > 0) {
          game.players[0].isHost = true;
          io.in(roomId).emit('changedRoom', game);
        } else {
          const intervalId = games[roomId]?.intervalId;
          clearInterval(intervalId);
          delete games[roomId];
        }
      }
    }
  });
};
