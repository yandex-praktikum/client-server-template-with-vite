import { IState } from '../../types/state.interface';

export const selectGameStatus = (state: IState) => state.game.status;
