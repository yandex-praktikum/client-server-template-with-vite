import React, { useEffect } from 'react'

import s from './index.module.scss'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { LeaderBoardItem } from '../../components/LeaderBoardItem'
import {
  addNewUserToLeadBoard,
  getLeaderBoardThunk,
} from '../../store/leaderBoard/dispatchers'
import { getLeaderBoardPageData } from '../../store/leaderBoard/selectors'
import { TeamName } from '../../const/api'

const LeaderBordPage = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(getLeaderBoardPageData)

  useEffect(() => {
    dispatch(getLeaderBoardThunk())
  }, [dispatch])

  const addLeadHandler = () => {
    const data = {
      ratingFieldName: 'Vasia',
      score: 222,
    }

    const requestData = {
      data,
      ratingFieldName: 'Vasia',
      teamName: TeamName,
    }

    dispatch(addNewUserToLeadBoard(requestData))
  }

  const leaderBoardItems = data.map(({ name, score }, index) => (
    <LeaderBoardItem
      key={`${name}${score}`}
      name={name}
      place={index + 1}
      score={score}
    />
  ))

  return (
    <>
      <h1 className={s.title}>Доска лидеров</h1>
      <div className={s.table}>{leaderBoardItems}</div>
      <button onClick={addLeadHandler}>AddLead</button>
    </>
  )
}

export default LeaderBordPage
