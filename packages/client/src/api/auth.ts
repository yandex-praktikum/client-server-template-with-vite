import { IUserInfo } from '@src/types/pageContext';
import { AUTH_API } from '@src/utils/constants';
import axios, { type AxiosPromise } from 'axios';

/**
 * Получение данных пользователя
 */
export const getUserData = (): AxiosPromise<IUserInfo> =>
  axios.get(`${AUTH_API}/user`, { withCredentials: true });

/**
 * Логин
 */
export interface IUserSigninReq {
  login: string;
  password: string;
}

export const requestLogIn = (data: IUserSigninReq): AxiosPromise =>
  axios.post(`${AUTH_API}/signin`, data, { withCredentials: true });

/**
 * Логаут
 */
export const requestLogOut = (): AxiosPromise =>
  axios.post(`${AUTH_API}/logout`, {}, { withCredentials: true });

/**
 * Регистрация
 */
export interface IUserSignUpReq {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export const requestSignUp = (data: IUserSignUpReq) =>
  axios.post(`${AUTH_API}/signup`, data, { withCredentials: true });
