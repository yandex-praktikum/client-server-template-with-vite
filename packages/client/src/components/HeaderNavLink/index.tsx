import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './index.module.scss'

interface IHeaderNavLink {
  to: string
  label: string
}

const HeaderNavLink = ({ to, label }: IHeaderNavLink) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? s.active : s.link)}>
      {label}
    </NavLink>
  )
}

export default HeaderNavLink
