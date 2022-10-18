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
  theme: string;
  isAuthModalOpen: boolean;
  isLoading: boolean;
  language: string;
}
