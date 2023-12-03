import { axiosInstance } from './axiosInstance'
import { END_POINTS_URL } from '../const/api'
import { TUserData, TUserPassword } from './types'

export const userApi = {
  changeUserProfileData(data: TUserData) {
    return axiosInstance.put<TUserData>(
      END_POINTS_URL.CHANGE_USER_PROFILE,
      data
    )
  },
  changeUserPasswordData(data: TUserPassword) {
    return axiosInstance.put<TUserData>(
      END_POINTS_URL.CHANGE_USER_PASSWORD,
      data
    )
  },
  setNewAvatarData(data: FormData) {
    return axiosInstance.put<TUserData>(
      END_POINTS_URL.CHANGE_USER_PROFILE_AVATAR,
      data
    )
  },
}
