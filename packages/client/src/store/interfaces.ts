import type { TGame } from '../../../shared/types';

export type TInitialUser = {
  id: number | null;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export interface ICommonState {
  currentUser: TInitialUser;
  theme: 'default';
  isAuthModalOpen: boolean;
  isLoading: boolean;
  language: 'RU';
  currentGame: TGame | null;
}
