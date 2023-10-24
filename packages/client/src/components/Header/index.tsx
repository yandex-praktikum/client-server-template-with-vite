import React from 'react'
import s from './index.module.scss'
import GoBack from '../GoBack'
import { ROUTES_NAMES } from '../../const/routeNames'
import HeaderNavLink from '../HeaderNavLink'

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
        <img className={s.avatar} src="/src/assets/avatar.svg" alt="avatar" />
      </div>
    </header>
  )
}

export default Header
