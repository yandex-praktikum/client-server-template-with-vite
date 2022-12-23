import { IState } from '../types/state.interface';

export const gameStatusSelect = (state: IState) => state.game.status;
