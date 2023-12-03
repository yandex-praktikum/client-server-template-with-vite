export type TRequestStatus = {
  reason: string
}

export type TSignupRequestData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
  passwordRepeat: string
}

export type TSignupResponse = {
  id: number
}

export type TSignInRequestData = Pick<TSignupRequestData, 'login' | 'password'>

export type TUserData = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string | null
  email: string
}

export type TChatUserData = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  role: string
}

export type TUserPassword = {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

export type TSearchUserByLoginData = {
  login: string
}

export type TLastMessage = {
  user: {
    first_name: string
    second_name: string
    avatar: string
    email: string
    login: string
    phone: string
  }
  time: string
  content: string
}

export type TChat = {
  id: number
  title: string
  avatar: string
  unread_count: number
  created_by: number
  last_message: TLastMessage
}

export type TDeleteChatByIdData = {
  chatId: number
}

export type TAddUsersToChatByIdsData = {
  users: number[]
  chatId: number
}

export type TDeleteChatUsers = Pick<
  TAddUsersToChatByIdsData,
  'users' | 'chatId'
>

export type TGetChatUsers = {
  id: number
  offset?: number
  limit?: number
  name?: string
  email?: string
}

export type TToken = { token: string }

export type TMessage = {
  id: number
  user_id: number
  chat_id: number
  type: string
  time: string
  content: string
  is_read: boolean
  file: null
}

export type TRejectWithValue = { rejectValue: string }

export type TLeaderBoardItem = {
  name: string
  score: number
  avatar: string
}

export type TGetLeaderBoardResponse = { data: TLeaderBoardItem }[]

export type TLeaderBoardNewLeaderRequestData = {
  data: TLeaderBoardItem
  ratingFieldName: string
  teamName: string
}

export type TOAuthRequestData = {
  code: string
  redirect_uri: string
}

export type TOAuthResponseData = {
  data: {
    service_id: string
  }
}

export interface ServerError {
  data: {
    reason: string
  }
}
