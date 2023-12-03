export const BASE_URL = 'https://ya-praktikum.tech/api/v2'
export const BASE_RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources'

export enum END_POINTS_URL {
  // authApi
  SIGN_UP = '/auth/signup',
  SIGN_IN = '/auth/signin',
  AUTH_USER = '/auth/user',
  AUTH_LOGOUT = '/auth/logout',
  AUTH_YANDEX_LOGIN = '/oauth/yandex',
  GET_AUTH_YANDEX_INFORMATION = '/oauth/yandex/service-id',
  // userApi
  GET_USER_BY_ID = '/user/',
  SEARCH_USER = '/user/search',
  CHANGE_USER_PROFILE = '/user/profile',
  CHANGE_USER_PASSWORD = '/user/password',
  CHANGE_USER_PROFILE_AVATAR = '/user/profile/avatar',
  LEADER_BOARD = '/leaderboard',
  LEADER_BOARD_ALL = '/leaderboard/all',
}

export enum API_ERROR_MESSAGES {
  COOKIE_NOT_VALID = 'Cookie is not valid',
  USER_ALREADY_IN_SYSTEM = 'User already in system',
  UNKNOWN_ERROR = 'Unknown error, please, reload page',
}

export const TeamName = 'cherryPies'

export const OAUTH_REDIRECT_URL = 'http://localhost:3000'
