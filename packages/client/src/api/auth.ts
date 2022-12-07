import axios, { AxiosPromise } from 'axios'
import { AUTH_API } from '../utils/constants'
import { IUserInfo } from '../types/pageContext'

/**
 * Получение данных пользователя
 */
export const getUserData = (): AxiosPromise<IUserInfo> =>
  axios.get(`${AUTH_API}/user`, { withCredentials: true })

/**
 * Логин
 */
export interface IUserSigninReq {
  login: string
  password: string
}

export const requestLogIn = (data: IUserSigninReq): AxiosPromise =>
  axios.post(`${AUTH_API}/signin`, data, { withCredentials: true })

/**
 * Логаут
 */
export const requestLogOut = (): AxiosPromise =>
  axios.post(`${AUTH_API}/logout`, {}, { withCredentials: true })
