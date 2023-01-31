import { EGameStatus } from '../enums/gameStatus.enum';

export interface IGame {
  status: EGameStatus,
  score: number,
}
