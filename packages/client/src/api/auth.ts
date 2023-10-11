import { UserType } from '@components/types'
import { yandexApi } from './setupApi'

export type SignInType = {
  login: string
  password: string
}

export type NewUser = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string,
  password: string
}

export const getUserInfo = (): Promise<UserType> => {
  return yandexApi.get('auth/user').then(res => {
    return res.data
  })
}

export const postLoginUser = ({
  login,
  password,
}: SignInType): Promise<UserType> => {
  return yandexApi.post('auth/signin', { login, password })
}

export const postLogout = () => {
  return yandexApi.post('auth/logout')
}

export const postSignUp = (newUser: NewUser) => {
  return yandexApi.post('auth/signUp', newUser)
}
