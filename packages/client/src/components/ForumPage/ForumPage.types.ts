export type TUser = {
  avatar: string
  firstName: string
  lastName: string
}

export type TComment = {
  id: number
  // текст комментария
  content: string
  // автор комментария
  author: TUser
  // дата создания комментария
  createdAt: string
  // ответы на комментарий
  answers?: TComment[]
}

export type TTheme = {
  id: number
  // название темы
  title: string
  // содержание
  content: string
  // автор темы
  author: TUser
  // дата создания темы
  createdAt: string
  // обсуждения темы
  discussions?: TComment[]
}
