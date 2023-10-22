import React from 'react'
import styles from './index.module.scss'
import { ErrorPageLink } from '../../components/errorPageLink'

const Error5XX = () => {
  return (
    <div className="page_wrapper error_page_background">
      <h1 className={`error_page_header ${styles.font_40}`}>500</h1>
      <p className={`error-page_message ${styles.font_20}`}>
        Что-то пошло не так!
      </p>
      <ErrorPageLink />
    </div>
  )
}

export default Error5XX
