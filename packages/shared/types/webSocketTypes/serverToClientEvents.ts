import type { TSocketErrorMessage } from './sockerErrorMessage';

import type { TGame } from '../gameTypes';

// todo:
// пока на каждое событие возвращается полный объект со всей игрой
// потом надо оптимизировать и возвращать только нужные данные,
// тем самым уменьшим размер передаваемых данных

export interface IServerToClientEvents {
  createdRoom: (createdGame: TGame) => void;
  joinedRoom: (game: TGame) => void;
  started: (game: TGame) => void;
  movedSnakes: (game: TGame) => void;
  error: (message: TSocketErrorMessage) => void;
}
