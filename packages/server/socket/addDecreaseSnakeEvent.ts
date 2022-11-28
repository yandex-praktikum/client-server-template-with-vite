import type { Socket } from 'socket.io';

import type { IClientToServerEvents, IServerToClientEvents, TGames } from '../../shared/types';

export const addDecreaseSnakeEvent = (socket: Socket<IClientToServerEvents, IServerToClientEvents>, games: TGames) =>
  socket.on('decreaseSnake', (roomId, user) => {
    const player = games[roomId]?.players.find(p => p.user.id === user.id);

    if (player && player.segments.length > 2) {
      player.segments.pop();
    }
  });
