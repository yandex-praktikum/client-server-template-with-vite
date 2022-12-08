import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IUserSigninReq, requestLogOut, requestLogIn } from '../api/auth';
import { ROUTE_PATHS } from '../utils/routes';

export interface IUseAuthReturn {
  login: (data: IUserSigninReq) => void
  logout: VoidFunction
}

export const useAuth = (): IUseAuthReturn => {
  const navigate = useNavigate();

  const login = useCallback(async (data: IUserSigninReq) => {
    try {
      await requestLogIn(data);
      navigate(ROUTE_PATHS.login);
    } catch (err) {
      return err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await requestLogOut();
      navigate(ROUTE_PATHS.game);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    login,
    logout,
  };
};
