import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hook/hook'
import { Avatar } from '../../components/Avatar'
import { ROUTES_NAMES } from '../../const/routeNames'
import { getUserData } from '../../store/user/selectors'
import s from './index.module.scss'
import notificationApi from '../../utils/notificationApi'

type TMainPage = {
  logoutCallback: () => void
}

const MainPage = ({ logoutCallback }: TMainPage) => {
  const { user } = useAppSelector(getUserData)

  useEffect(() => {
    const data = {
      title: 'Notification API',
      body: 'This is Notification API',
      src: 'src/assets/tower-icon.png',
    }
    notificationApi(data)
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <header className={s.header}>
          <button onClick={logoutCallback} className={s.btn}>
            Выйти
          </button>
          <Avatar imageUrl={user.avatar} className={s.avatar} />
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
