import { TUserData } from '../api/types'

export const imageFileExtension = ['.jpg', '.jpeg', '.png']

export const initialData: TUserData = {
  id: 0,
  first_name: '',
  second_name: '',
  phone: '',
  login: '',
  email: '',
  display_name: '',
  avatar: '',
}

export enum USER_PROFILE_ERRORS_TEXT {
  FILE_EXTENSION = 'file extension error, select file .jpg, .jpeg, .png',
  PASSWORD_NOT_SAME = 'new password and repeated one are not the same',
  UNKNOWN_ERROR = 'Unknown error',
}
