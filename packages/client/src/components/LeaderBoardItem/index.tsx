import React from 'react'

import { Avatar } from '../Avatar'

import s from './index.module.scss'

type TLeaderBoardItemProps = {
  place: number
  name: string
  score: number
  avatar: string
}

export const LeaderBoardItem = ({
  place,
  name,
  score,
  avatar,
}: TLeaderBoardItemProps) => {
  return (
    <div className={`${s.row} ${s.td_body}`}>
      <div>{place}</div>
      <div className={s.td_name}>
        <Avatar imageUrl={avatar} />
        <span>{name}</span>
      </div>
      <div>{score}</div>
    </div>
  )
}
