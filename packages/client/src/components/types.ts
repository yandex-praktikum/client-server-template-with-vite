export type PageTypes = 'profile' | 'leaderboard' | 'game' | 'forum'
export type UserType = {
  avatar?: string
  first_name?: string
  second_name?: string
  phone?: string
  login: string
  email: string
}

export type LeaderUserType = {
  avatar?: string
  display_name: string
  score: number
  position: 'first' | 'second' | 'third'
}
