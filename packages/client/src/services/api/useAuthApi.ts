import useBaseApi from './useBaseApi';

export type TAuthApiSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  repeat_password: string;
};

export type TAuthApiSignIn = {
  login: string;
  password: string;
};

const useAuthApi = () => {
  const { post, get } = useBaseApi({ path: '/auth' });

  function signUp(data: TAuthApiSignUp) {
    return post({ endpoint: '/signup', data });
  }

  function signIn(data: TAuthApiSignIn) {
    return post({ endpoint: '/signin', data });
  }

  function getUser() {
    return get('/user');
  }

  function logout() {
    return post({ endpoint: '/logout' });
  }

  return { signUp, signIn, getUser, logout };
};

export default useAuthApi;
