import type socketIo from 'socket.io';

import type { IClientToServerEvents, IServerToClientEvents, TGame } from '../../../shared/types';

export const runEmitCoordsLoop = (io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>, game: TGame) => {
  const timerId = setInterval(() => {

    io.in(game.roomId).emit('movedSnakes', game);
    // TODO: 30 - в константу
  }, 30);

  game.intervalId = timerId;
};
