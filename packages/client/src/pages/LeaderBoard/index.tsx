import React, { useEffect } from 'react'

import { setNewScore } from '../../store/leaderBoard/slice'
import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { LeaderBoardItem } from '../../components/LeaderBoardItem'
import { getLeaderBoardPageData } from '../../store/leaderBoard/selectors'
import {
  getLeaderBoardThunk,
  addNewUserToLeadBoard,
} from '../../store/leaderBoard/dispatchers'

import s from './index.module.scss'

const LeaderBordPage = () => {
  const dispatch = useAppDispatch()
  const { data, newScore } = useAppSelector(getLeaderBoardPageData)

  useEffect(() => {
    dispatch(getLeaderBoardThunk())
  }, [dispatch])

  const addLeadHandler = () => {
    dispatch(addNewUserToLeadBoard(+newScore))
  }

  const setNewScoreHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    dispatch(setNewScore(value))
  }

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
      <div className={s.wrapper}>
        <input value={newScore} type={'number'} onChange={setNewScoreHandler} />
        <button onClick={addLeadHandler}>AddLead</button>
      </div>
    </>
  )
}

export default LeaderBordPage
