import { TGame, TSnakeColor } from '../../../../../shared/types';

export interface IMultiPLayerScore {
  points: number;
  id: number | null;
  login: string | null;
  color: TSnakeColor | null;
}

export interface ICommonState {
  theme: 'default';
  isAuthModalOpen: boolean;
  language: 'RU';
  currentGame: TGame | null;
  lastScore: null | IMultiPLayerScore[];
}
