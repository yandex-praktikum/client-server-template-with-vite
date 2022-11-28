import { io, Socket } from 'socket.io-client';

import { CHICAGO_SOCKET_URL } from '../../../../shared/consts/common';
import type { IClientToServerEvents, IServerToClientEvents } from '../../../../shared/types';

const SERVER_SOCKET_URL = import.meta.env.MODE === 'production' ? CHICAGO_SOCKET_URL : 'http://localhost:3001';

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(SERVER_SOCKET_URL, {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.info('Socket connected');
});

socket.on('disconnect', () => {
  console.info('Socket disconnected');
});
