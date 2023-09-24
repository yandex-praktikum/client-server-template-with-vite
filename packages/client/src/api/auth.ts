import { UserType } from '@components/types'
import { yandexApi } from './setupApi'
import { ErrorType } from './getApiError'

export type SignInType = {
  login: string
  password: string
}

export const getUserInfo = (): Promise<UserType | ErrorType> => {
  return yandexApi.get('auth/user').then(res => {
    return res.data
  })
}

export const postLoginUser = ({
  login,
  password,
}: SignInType): Promise<UserType> => {
  return yandexApi
    .post('auth/signin', { login, password })
    .then(res => res.data)
}
