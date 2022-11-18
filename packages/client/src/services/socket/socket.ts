import { io, Socket } from 'socket.io-client';

import type { IClientToServerEvents, IServerToClientEvents } from '../../../../shared/types';

// todo: убрать хардкод (вынести url в env или в константу)
const SERVER_SOCKET_URL = import.meta.env.MODE === 'production' ? 'https://chicago-server-api.herokuapp.com' : 'http://localhost:3001';

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(SERVER_SOCKET_URL, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.info('Socket connected');
});

socket.on('disconnect', () => {
  console.info('Socket disconnected');
});
