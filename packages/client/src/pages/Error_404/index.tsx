import React from 'react'
import styles from './index.module.scss'
import { ErrorPageLink } from '../../components/ErrorPageLink'

const Error404 = () => {
  return (
    <div className="page_wrapper error_page_background">
      <h1 className={`error_page_header ${styles.font_40}`}>404</h1>
      <p className={`error-page_message ${styles.font_20}`}>
        страницы не существует
      </p>
      <ErrorPageLink />
    </div>
  )
}

export default Error404
