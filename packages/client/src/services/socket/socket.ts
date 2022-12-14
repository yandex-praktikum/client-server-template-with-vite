import { createContext } from 'react';
import { type Socket } from 'socket.io-client';

import type { IClientToServerEvents, IServerToClientEvents } from '../../../../shared/types';

export const socket: Socket<IServerToClientEvents, IClientToServerEvents> = {} as Socket<
  IServerToClientEvents,
  IClientToServerEvents
>;

export const SocketContext = createContext<Socket<IServerToClientEvents, IClientToServerEvents>>(socket);
