import type { Socket } from 'socket.io';

import { SNAKE_COLORS } from '../../shared/consts';
import { INITIAL_CURSOR_POSITION, INITIAL_PLAYER_POSITIONS } from '../../shared/consts/settings';
import type { IClientToServerEvents, IServerToClientEvents, TGames, TPlayer } from '../../shared/types';

export const addJoinRoomEvent = (socket: Socket<IClientToServerEvents, IServerToClientEvents>, games: TGames) => {
  socket.on('joinRoom', (roomId, player) => {
    const game = games[roomId];
    const playerNumber = game.players.length;

    if (game) {
      const newPlayer: TPlayer = {
        color: SNAKE_COLORS[playerNumber],
        isHost: false,
        isBoost: false,
        user: player,
        cursorPosition: INITIAL_CURSOR_POSITION,
        // TODO: через массив fill для более короткой записи
        segments: [{ ...INITIAL_PLAYER_POSITIONS[playerNumber] }, { ...INITIAL_PLAYER_POSITIONS[playerNumber] }],
        headCoords: { ...INITIAL_PLAYER_POSITIONS[playerNumber] },
      };
      game.players.push(newPlayer);
      socket.join(roomId);

      socket.to(game.roomId).emit('joinedRoom', game);
      socket.emit('joinedRoom', game);
    } else {
      // TODO:
      // добавить обработку ошибки, если игры не найдено
      // добавить ошибку, если в комнате уже максимальное число игроков и нового нельзя добавить
      // добавить ошибку, если игра уже началась и ее статус не waiting
      // добавить ошибку, если этот игрок уже подключился ранее
    }
  });
};
