import { TGame } from '../../../../../shared/types';

export interface ICommonState {
  theme: 'default';
  isAuthModalOpen: boolean;
  language: 'RU';
  currentGame: TGame | null;
}
