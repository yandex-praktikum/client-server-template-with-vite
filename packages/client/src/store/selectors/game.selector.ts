import { IState } from '../../types/state.interface';

export const selectGameStatus = (state: IState) => state.game.status;
export const selectGameScore = (state: IState) => state.game.score;
