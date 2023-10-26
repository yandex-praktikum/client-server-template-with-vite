import { TUserData } from '../../api/types'

export type TForum = {
  id: number
  title: string
}

export type TForumCreation = {
  title: string
  description: string
}

export type TComment = {
  user: TUserData
  likesCount: number
  isLiked: boolean
}

export type TForumDetails = TForum & {
  comments: TComment[]
}
