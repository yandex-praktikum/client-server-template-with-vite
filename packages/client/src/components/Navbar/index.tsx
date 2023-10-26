import React from 'react'
import style from './index.module.scss'
import { NavbarItem } from '../NavbarItem'
import { NavbarAvatar } from '../NavbarAvatar'
import { ROUTES_NAMES } from '../../const/routeNames'

type TNavbar = {
  imageUrl: string
  pathName: string
}

export const Navbar = ({ imageUrl, pathName }: TNavbar) => {
  return (
    <div className={style.navbarWrapper}>
      <NavbarItem to={ROUTES_NAMES.MAIN} pathName={pathName} text="Главная" />
      <NavbarItem
        to={ROUTES_NAMES.SETTINGS}
        pathName={pathName}
        text="Профиль"
      />
      <NavbarItem
        to={ROUTES_NAMES.LEADER_BOARD}
        pathName={pathName}
        text="Лидеры"
      />
      <NavbarItem to={ROUTES_NAMES.FORUM} pathName={pathName} text="Форум" />
      <NavbarAvatar imageUrl={imageUrl} />
    </div>
  )
}
