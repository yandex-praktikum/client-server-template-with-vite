import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { LeaderBoardItem } from '../../components/LeaderBoardItem'
import { getLeaderBoardPageData } from '../../store/leaderBoard/selectors'
import { getLeaderBoardThunk } from '../../store/leaderBoard/dispatchers'

import s from './index.module.scss'

const LeaderBordPage = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(getLeaderBoardPageData)

  useEffect(() => {
    dispatch(getLeaderBoardThunk())
  }, [dispatch])

  const leaderBoardItems = data.map(({ name, score, avatar }, index) => (
    <LeaderBoardItem
      key={`${name}${score}`}
      place={index + 1}
      name={name}
      score={score}
      avatar={avatar}
    />
  ))

  return (
    <>
      <h1 className={s.title}>Доска лидеров</h1>
      <div className={s.table}>{leaderBoardItems}</div>
    </>
  )
}

export default LeaderBordPage
