import { TUserData } from '../../api/types'

export type TForum = {
  id: string
  title: string
  description: string
  image: string
}

export type TForumCreation = {
  title: string
  description: string
}

export type TComment = {
  id: string
  text: string
  date: string
  user: TUserData
  likesCount: number
  isLiked: boolean
}

export type TForumDetails = TForum & {
  comments: TComment[]
}

export type TForumMessageCreation = {
  message: string
}
