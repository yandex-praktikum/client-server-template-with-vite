import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.module.scss'

type TNavbarItem = {
  to: string
  text: string
  pathName: string
}

export const NavbarItem = ({ to, text, pathName }: TNavbarItem) => {
  const isActive = to === pathName

  return (
    <Link
      to={to}
      className={`${style.link} ${isActive ? style.active : ''} ${
        style.font_20
      }`}>
      {text}
    </Link>
  )
}
