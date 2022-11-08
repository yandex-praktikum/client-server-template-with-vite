import type { Socket } from 'socket.io';

import { FOOD_SIZE, SEGMENT_SIZE } from '../../shared/consts';
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
    // TODO: убрать длину змейки, если она неподвижна ( возможно это надо сделать на фронте) В общем подумать
    // Пусть фронт запускает таймер, и отправляет эвент о простое
    // (чтобы бэк в случае с задержкой сети не уменьшал длину игрока)

    const game = games[roomId];

    if (game) {
      const player = game.players.find(p => p.user.id === playerId);

      if (player) {
        player.cursorPosition = coords;
        player.isBoost = isBoost;

        moveSnake(player);

        const distanceToFood = getDistanceBetweenTwoPoints(player.headCoords, game.food.position);

        // TODO: проверить, какое растояние должно быть действительно
        if (distanceToFood < SEGMENT_SIZE + FOOD_SIZE / 2) {
          changeFood(game);
          increaseSnake(player);
        }
      }
    } else {
      // TODO:
      // добавить обработку ошибки, если игры не найдено или игрока
    }
  });
};
