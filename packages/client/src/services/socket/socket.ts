import { io, Socket } from 'socket.io-client';

import type { IClientToServerEvents, IServerToClientEvents } from '../../../../shared/types';

// todo: убрать хардкод (использовать url из env)
// todo: возможно стоит вынести константу, но куда?
const SERVER_SOCKET_URL =
  import.meta.env.MODE === 'production' ? 'https://chicago-api.herokuapp.com' : 'http://localhost:3001';

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(SERVER_SOCKET_URL, {
  // TODO: сравнить со значением на бэке и решить точно ли нужна эта опция
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.info('Socket connected');
});

socket.on('disconnect', () => {
  console.info('Socket disconnected');
});
