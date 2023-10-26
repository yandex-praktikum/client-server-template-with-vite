import React from 'react'
import styles from './index.module.scss'
import { ErrorPageLink } from '../../components/ErrorPageLink'

const Error404 = () => {
  return (
    <div className="page-wrapper error-page-background">
      <h1 className={`error-page-header ${styles.font_40}`}>404</h1>
      <p className={`error-page-message ${styles.font_20}`}>
        страницы не существует
      </p>
      <ErrorPageLink />
    </div>
  )
}

export default Error404
