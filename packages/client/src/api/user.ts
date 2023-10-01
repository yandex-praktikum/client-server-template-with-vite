import { yandexApi } from "./setupApi"

export type PasswordRequest = {
    oldPassword: string,
    newPassword: string  
  }

export type UserProfile = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

  export const putChangePassword = (request: PasswordRequest) => {
    return yandexApi.put('user/password', request)
    .catch((reason) => {console.log(reason)});
  }

  export const putUserProfile = (request: UserProfile) => {
    return yandexApi.put('user/profile', request)
    .catch((reason) => console.log(reason));
  }
