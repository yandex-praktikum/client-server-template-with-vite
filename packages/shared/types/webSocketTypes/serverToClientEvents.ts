import type { TGame } from '../gameTypes';

// TODO:
// пока на каждое событие возвращается полный объект со всей игрой
// потом надо оптимизировать и возвращать только нужные данные,
// тем самым уменьшим размер передаваемых данных

// TODO:
// добавить emit для ошибок/общей ошибки
export interface IServerToClientEvents {
  createdRoom: (createdGame: TGame) => void;
  joinedRoom: (game: TGame) => void;
  started: (game: TGame) => void;
  movedSnakes: (game: TGame) => void;
}
