export type PageTypes = 'profile' | 'leaderboard' | 'game' | 'forum' | 'default'
export type UserType = {
  id: number
  display_name: null | string
  first_name: string | null
  second_name: string | null
  login: string
  email: string
  phone: string | null
  avatar: string | null
}

export type LeaderUserType = {
  avatar?: string
  display_name: string
  score: number
  position: 'first' | 'second' | 'third'
}

export type GameType = {
  score: number
}
