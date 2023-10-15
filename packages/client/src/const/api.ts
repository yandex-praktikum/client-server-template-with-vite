export const BASE_URL = 'https://ya-praktikum.tech/api/v2'
export const BASE_RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources'

export enum END_POINTS_URL {
  // authApi
  SIGN_UP = '/auth/signup',
  SIGN_IN = '/auth/signin',
  AUTH_USER = '/auth/user',
  AUTH_LOGOUT = '/auth/logout',
  // userApi
  GET_USER_BY_ID = '/user/',
  SEARCH_USER = '/user/search',
  CHANGE_USER_PROFILE = '/user/profile',
  CHANGE_USER_PASSWORD = '/user/password',
  CHANGE_USER_PROFILE_AVATAR = '/user/profile/avatar',
}
