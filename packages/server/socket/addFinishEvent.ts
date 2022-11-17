import type { Socket } from 'socket.io';

import type { IClientToServerEvents, IServerToClientEvents, TGames } from '../../shared/types';

export const addFinishEvent = (socket: Socket<IClientToServerEvents, IServerToClientEvents>, games: TGames) => {
  socket.on('finish', roomId => {
    const intervalId = games[roomId]?.intervalId;
    clearInterval(intervalId);

    delete games[roomId];
  });
};
