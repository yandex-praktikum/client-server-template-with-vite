import type socketIo from 'socket.io';

import { SERVER_SOCKET_DELAY } from '../../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGame } from '../../../shared/types';

export const runEmitCoordsLoop = (io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>, game: TGame) => {
  const timerId = setInterval(() => {
    io.in(game.roomId).emit('movedSnakes', game);
  }, SERVER_SOCKET_DELAY);

  // TODO: остановить таймер при окончании игры
  game.intervalId = timerId;
};
