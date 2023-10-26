import React from 'react'
import s from './index.module.scss'
import GoBack from '../GoBack'
import { ROUTES_NAMES } from '../../const/routeNames'
import HeaderNavLink from '../HeaderNavLink'
import { Avatar } from '../Avatar'

const Header = () => {
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
        <Avatar imageUrl={null} />
      </div>
    </header>
  )
}

export default Header
