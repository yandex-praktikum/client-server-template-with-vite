import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { ROUTES_NAMES } from '../../const/routeNames'

const Error5XX = () => {
  return (
    <div className="page_wrapper">
      <h1 className={`error_page_header ${styles.font_40}`}>500</h1>
      <p className={`error-page_message ${styles.font_20}`}>
        Что-то пошло не так!
      </p>
      <Link
        to={ROUTES_NAMES.MAIN}
        className={`${styles.font_11} ${styles.link}`}>
        Назад в безопасность
      </Link>
    </div>
  )
}

export default Error5XX
