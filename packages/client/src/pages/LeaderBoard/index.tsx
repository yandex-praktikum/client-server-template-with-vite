import React from 'react'

import s from './index.module.scss'

const LeaderBordPage = () => {
  return (
    <>
      <h1 className={s.title}>Доска лидеров</h1>
      <div className={s.table}>
        <div className={`${s.row} ${s.thead}`}>
          <div>Место</div>
          <div>Игрок</div>
          <div>Счет</div>
        </div>
        <div className={`${s.row} ${s.td_body}`}>
          <div>1</div>
          <div className={s.td_name}>
            <img
              className={s.avatar}
              src="src/assets/avatar.svg"
              alt="avatar"
            />
            <span>name</span>
          </div>
          <div>222</div>
        </div>
        <div className={`${s.row} ${s.td_body}`}>
          <div>1</div>
          <div className={s.td_name}>
            <img
              className={s.avatar}
              src="src/assets/avatar.svg"
              alt="avatar"
            />
            <span>name</span>
          </div>
          <div>222</div>
        </div>
      </div>
    </>
  )
}

export default LeaderBordPage
