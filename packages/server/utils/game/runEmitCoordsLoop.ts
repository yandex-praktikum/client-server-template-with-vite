import type socketIo from 'socket.io';

import { GAME_DURATION_MS, SERVER_SOCKET_DELAY } from '../../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGame } from '../../../shared/types';

export const runEmitCoordsLoop = (io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>, game: TGame) => {
  const intervalId = setInterval(() => {
    io.in(game.roomId).emit('changedRoom', game);
  }, SERVER_SOCKET_DELAY);
  game.intervalId;
  setTimeout(() => {
    clearInterval(intervalId);
  }, GAME_DURATION_MS);
};
