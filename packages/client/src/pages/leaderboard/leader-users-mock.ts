import { DEFAULT_AVATAR } from '@/utils/constants'
import { LeaderUserType } from '@components/types'
import avatar0 from '../../../public/rigel.jpg'
import avatar2 from '../../../public/avatar2.jpg'
import avatar1 from '../../../public/avatar1.jpg'

export const usersScoreMock = [
  {
    avatar: DEFAULT_AVATAR,
    name: 'Leonardo',
    score: 19800,
  },
  {
    avatar: DEFAULT_AVATAR,
    name: 'Artur Klark',
    score: 19800,
  },
  {
    avatar: DEFAULT_AVATAR,
    name: 'Turing',
    score: 19800,
  },
  {
    avatar: DEFAULT_AVATAR,
    name: 'Brian Herbert',
    score: 19800,
  },
  {
    avatar: DEFAULT_AVATAR,
    name: 'Mr. Feynman',
    score: 19800,
  },
  {
    avatar: DEFAULT_AVATAR,
    name: 'Mari Shelli',
    score: 19800,
  },
]

export const leadersMock: LeaderUserType[] = [
  {
    avatar: avatar0,
    display_name: 'Rigel',
    score: 23000,
    position: 'first',
  },
  {
    avatar: avatar2,
    display_name: 'Mipha',
    score: 20022,
    position: 'second',
  },
  {
    avatar: avatar1,
    display_name: 'Link',
    score: 19988,
    position: 'third',
  },
]
