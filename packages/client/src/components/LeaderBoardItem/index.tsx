import React from 'react'

import s from './index.module.scss'

type TLeaderBoardItemProps = {
  place: number
  name: string
  score: number
}

export const LeaderBoardItem = ({
  place,
  name,
  score,
}: TLeaderBoardItemProps) => {
  return (
    <div className={`${s.row} ${s.td_body}`}>
      <div>{place}</div>
      <div className={s.td_name}>
        <img className={s.avatar} src="src/assets/avatar.svg" alt="avatar" />
        <span>{name}</span>
      </div>
      <div>{score}</div>
    </div>
  )
}
