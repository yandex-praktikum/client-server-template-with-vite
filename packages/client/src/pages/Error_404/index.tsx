import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { ROUTES_NAMES } from '../../const/routeNames'

const Error404 = () => {
  return (
    <div className="page_wrapper">
      <h1 className={`error_page_header ${styles.font_40}`}>404</h1>
      <p className={`error-page_message ${styles.font_20}`}>
        страницы не существует
      </p>
      <Link
        to={ROUTES_NAMES.MAIN}
        className={`${styles.font_11} ${styles.link}`}>
        Назад в безопасность
      </Link>
    </div>
  )
}

export default Error404
