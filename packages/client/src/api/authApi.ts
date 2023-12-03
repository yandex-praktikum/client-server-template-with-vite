import { axiosInstance } from './axiosInstance'
import { END_POINTS_URL, OAUTH_REDIRECT_URL } from '../const/api'
import {
  TUserData,
  TRequestStatus,
  TSignupResponse,
  TSignInRequestData,
  TSignupRequestData,
  TOAuthRequestData,
  TOAuthResponseData,
} from './types'

export const authApi = {
  signup(data: TSignupRequestData) {
    return axiosInstance.post<TSignupResponse | TRequestStatus>(
      END_POINTS_URL.SIGN_UP,
      data
    )
  },
  login(data: TSignInRequestData) {
    return axiosInstance.post<TSignupResponse | TRequestStatus>(
      END_POINTS_URL.SIGN_IN,
      data
    )
  },
  logout() {
    return axiosInstance.post<TRequestStatus>(END_POINTS_URL.AUTH_LOGOUT)
  },
  getOAuthInformation() {
    return axiosInstance.get<TOAuthRequestData, TOAuthResponseData>(
      `${END_POINTS_URL.GET_AUTH_YANDEX_INFORMATION}/?redirect_uri=${OAUTH_REDIRECT_URL}`
    )
  },
  loginOAuth(data: TOAuthRequestData) {
    return axiosInstance.post<TOAuthRequestData>(
      END_POINTS_URL.AUTH_YANDEX_LOGIN,
      data
    )
  },
  getUserData() {
    return axiosInstance.get<TUserData>(END_POINTS_URL.AUTH_USER)
  },
}
