import { instance } from './axiosInstance'
import { END_POINTS_URL } from '../const/api'
import {
  TUserData,
  TRequestStatus,
  TSignupResponse,
  TSignInRequestData,
  TSignupRequestData,
} from './types'

export const authApi = {
  signup(data: TSignupRequestData) {
    return instance.post<TSignupResponse | TRequestStatus>(
      END_POINTS_URL.SIGN_UP,
      data
    )
  },
  login(data: TSignInRequestData) {
    return instance.post<TSignupResponse | TRequestStatus>(
      END_POINTS_URL.SIGN_IN,
      data
    )
  },
  logout() {
    return instance.post(END_POINTS_URL.AUTH_LOGOUT)
  },
  getUserData() {
    return instance.get<TUserData>(END_POINTS_URL.AUTH_USER)
  },
}
