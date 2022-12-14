import type socketIo from 'socket.io';

import { addChangeCursorPositionEvent } from './addChangeCursorPositionEvent';
import { addCreateRoomEvent } from './addCreateRoomEvent';
import { addDecreaseSnakeEvent } from './addDecreaseSnakeEvent';
import { addJoinRoomEvent } from './addJoinRoomEvent';
import { addStartEvent } from './addStartEvent';
import { addUserDisconnectedEvent } from './addUserDisconnectedEvent';

import type { IClientToServerEvents, IServerToClientEvents, TGames } from '../../shared/types';

export * from './addCreateRoomEvent';
export * from './addChangeCursorPositionEvent';
export * from './addStartEvent';
export * from './addJoinRoomEvent';

export const addSocket = (io: socketIo.Server<IClientToServerEvents, IServerToClientEvents>) => {
  const games: TGames = {};

  io.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    // для создания комнаты хостом
    addCreateRoomEvent(socket, games, io);

    // для подключения к созданной комнате
    addJoinRoomEvent(socket, games, io);

    // для вызова начала игры (когда все игроки поключились к комнате и хост нажимает кнопку Старт)
    addStartEvent(socket, games, io);

    // для вызова игроком, чтобы передать текущие координаты мыши
    addChangeCursorPositionEvent(socket, games);

    // для исключения пользователя из игры, когда он подключился к комнате, а затем вышел из нее
    addUserDisconnectedEvent(socket, games, io);

    // для уменьшения длины змеи
    addDecreaseSnakeEvent(socket, games);
  });
};
