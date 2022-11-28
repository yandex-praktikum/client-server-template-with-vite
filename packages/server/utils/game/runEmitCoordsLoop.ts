import type socketIo from 'socket.io';

import { GAME_DURATION_MS, SERVER_SOCKET_DELAY } from '../../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGame, TGames } from '../../../shared/types';

export const runEmitCoordsLoop = (
  io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>,
  game: TGame,
  games: TGames
) => {
  const intervalId = setInterval(() => {
    io.in(game.roomId).emit('changedRoom', game);
  }, SERVER_SOCKET_DELAY);

  game.intervalId = intervalId;

  setTimeout(() => {
    clearInterval(intervalId);

    delete games[game.roomId];
    io.in(game.roomId).emit('finished', game.roomId);
    io.socketsLeave(game.roomId);
  }, GAME_DURATION_MS);
};
