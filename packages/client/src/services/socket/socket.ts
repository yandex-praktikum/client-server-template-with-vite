import { io, Socket } from 'socket.io-client';

import type { IClientToServerEvents, IServerToClientEvents } from '../../../../shared/types';

// TODO: change localhost for prod

// const SERVER_URL = 'https://chicago-api.herokuapp.com/';
const SERVER_URL = 'http://localhost:3001';

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(SERVER_URL, {
  // TODO: сравнить со значением на бэке и решить точно ли нужна эта опция
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.info('Socket connected');
});

socket.on('disconnect', () => {
  console.info('Socket disconnected');
});
