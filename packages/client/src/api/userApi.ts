import { instance } from './axiosInstance'
import { END_POINTS_URL } from '../const/api'
import { TUserData, TUserPassword } from './types'

export const userApi = {
  changeUserProfileData(data: TUserData) {
    return instance.put<TUserData>(END_POINTS_URL.CHANGE_USER_PROFILE, data)
  },
  changeUserPasswordData(data: TUserPassword) {
    return instance.put<TUserData>(END_POINTS_URL.CHANGE_USER_PASSWORD, data)
  },
  setNewAvatarData(data: FormData) {
    return instance.put<TUserData>(
      END_POINTS_URL.CHANGE_USER_PROFILE_AVATAR,
      data
    )
  },
}
