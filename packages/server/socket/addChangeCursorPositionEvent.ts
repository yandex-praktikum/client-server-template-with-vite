import type { Socket } from 'socket.io';

import { SOCKET_ERRORS } from '../../shared/consts';
import type { IClientToServerEvents, IServerToClientEvents, TGames } from '../../shared/types';
import { getDistanceBetweenTwoPoints } from '../../shared/utils';
import { changeFood } from '../utils/game/changeFood';
import { increaseSnake } from '../utils/game/increaseSnake';
import { moveSnake } from '../utils/game/moveSnake';

export const addChangeCursorPositionEvent = (
  socket: Socket<IClientToServerEvents, IServerToClientEvents>,
  games: TGames
) => {
  socket.on('changeCursorPosition', ({ roomId, playerId, coords, isBoost }) => {
    const game = games[roomId];

    if (game) {
      const player = game.players.find(p => p.user.id === playerId);

      if (player) {
        player.cursorPosition = coords;
        player.isBoost = isBoost;

        moveSnake(player);

        const distanceToFood = getDistanceBetweenTwoPoints(player.headCoords, game.food.position);

        if (distanceToFood < 50) {
          changeFood(game);
          increaseSnake(player);
        }
      } else {
        socket.emit('error', SOCKET_ERRORS.PLAYER_NOT_FOUND);
      }
    } else {
      socket.emit('error', SOCKET_ERRORS.GAME_NOT_FOUND);
    }
  });
};
