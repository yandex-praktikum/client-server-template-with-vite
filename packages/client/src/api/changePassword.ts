import { yandexApi } from "./setupApi"

export type PasswordRequest = {
    oldPassword: string,
    newPassword: string  
  }

  export const putChangePassword = (request: PasswordRequest) => {
    return yandexApi.put('user/password', request)
    .catch((reason) => {console.log(reason)});
  }
