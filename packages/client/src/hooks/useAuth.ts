import { useAppDispatch } from './useAppDispatch';

import { IUserSigninReq, IUserSignUpReq } from '../api/auth';
import { logIn, logOut, signUp } from '../store/actions/auth';

export interface IUseAuthReturn {
  login: (data: IUserSigninReq) => void;
  logout: VoidFunction;
  signup: (data: IUserSignUpReq) => void;
}

export const useAuth = (): IUseAuthReturn => {
  const dispatch = useAppDispatch();

  return {
    login: data => dispatch(logIn(data)),
    logout: () => dispatch(logOut()),
    signup: data => dispatch(signUp(data)),
  };
};
