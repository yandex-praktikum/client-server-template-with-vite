import React from 'react'
import s from './index.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES_NAMES } from '../../const/routeNames'

type TMainPage = {
  logoutCallback: () => void
}

const MainPage = ({ logoutCallback }: TMainPage) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <header className={s.header}>
          <button onClick={logoutCallback} className={s.btn}>
            Выйти
          </button>
          <div className={s.avatar}>
            <img src="/src/assets/avatar.svg" alt="avatar" />
          </div>
        </header>

        <main className={s.main}>
          <div className={s.btn_wrapper}>
            <Link to={ROUTES_NAMES.GAME} className={`${s.btn} ${s.btn_play}`}>
              Играть
            </Link>
            <Link to={ROUTES_NAMES.FORUM} className={`${s.btn} ${s.btn_forum}`}>
              Форум
            </Link>
            <Link
              to={ROUTES_NAMES.SETTINGS}
              className={`${s.btn} ${s.btn_profile}`}>
              Профиль
            </Link>
            <Link
              to={ROUTES_NAMES.LEADER_BOARD}
              className={`${s.btn} ${s.btn_leaders}`}>
              Доска лидеров
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MainPage
