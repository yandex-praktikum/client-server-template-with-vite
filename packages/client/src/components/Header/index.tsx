import React from 'react'
import GoBack from '../GoBack'
import { Avatar } from '../Avatar'
import HeaderNavLink from '../HeaderNavLink'
import { useAppSelector } from '../../hook/hook'
import { ROUTES_NAMES } from '../../const/routeNames'
import { getUserData } from '../../store/user/selectors'
import s from './index.module.scss'

const Header = () => {
  const { user } = useAppSelector(getUserData)
  return (
    <header className={s.header}>
      <GoBack />
      <div className={s.wrapper}>
        <nav className={s.nav}>
          <HeaderNavLink to={ROUTES_NAMES.MAIN} label="Главная" />
          <HeaderNavLink to={ROUTES_NAMES.SETTINGS} label="Профиль" />
          <HeaderNavLink to={ROUTES_NAMES.LEADER_BOARD} label="Лидеры" />
          <HeaderNavLink to={ROUTES_NAMES.FORUM} label="Форум" />
        </nav>
        <Avatar imageUrl={user.avatar} />
      </div>
    </header>
  )
}

export default Header
