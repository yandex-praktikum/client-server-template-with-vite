import { useNavigate } from 'react-router-dom';

import { setIsLoading, setUser, toggleAuthModalState } from '../../store/commonSlice';
import { INITIAL_USER } from '../../store/constants';
import { useAppDispatch } from '../../store/hooks';
import { handleError } from '../../utils/apiHandler';
import useAuthApi, { TAuthApiSignIn, TAuthApiSignUp } from '../api/useAuthApi';

const useAuthController = () => {
  const { signUp, signIn, getUser, logout } = useAuthApi();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function signUpController(formData: TAuthApiSignUp) {
    dispatch(setIsLoading(true));
    signUp(formData)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');

        return _getUserController();
      })
      .then(r => {
        dispatch(setUser(r));
        dispatch(toggleAuthModalState());
      })
      .catch(handleError)
      .finally(() => dispatch(setIsLoading(false)));
  }

  function signInController(formData: TAuthApiSignIn) {
    dispatch(setIsLoading(true));
    signIn(formData)
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');

        return _getUserController();
      })
      .then(r => {
        dispatch(setUser(r));
        dispatch(toggleAuthModalState());
      })
      .catch(handleError)
      .finally(() => dispatch(setIsLoading(false)));
  }

  function logoutController() {
    dispatch(setIsLoading(true));
    logout()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        navigate('/');
      })
      .then(() => dispatch(setUser(INITIAL_USER)))
      .catch(handleError)
      .finally(() => dispatch(setIsLoading(false)));
  }

  function checkUserAuth() {
    _getUserController()
      .then(r => dispatch(setUser(r)))
      .catch(() => dispatch(setUser(INITIAL_USER)));
  }

  function _getUserController() {
    return getUser()
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);

        return r.json();
      })
      .catch(handleError);
  }

  return { signInController, signUpController, logoutController, checkUserAuth };
};

export default useAuthController;
