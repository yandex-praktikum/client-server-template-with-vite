import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES_NAMES } from '../../const/routeNames'
import styles from './index.module.scss'

export const ErrorPageLink = () => {
  return (
    <Link to={ROUTES_NAMES.MAIN} className={`${styles.font_24} link`}>
      На главную
    </Link>
  )
}
