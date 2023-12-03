import React from 'react'
import styles from './index.module.scss'
import { ErrorPageLink } from '../../components/ErrorPageLink'

const Error5XX = () => {
  return (
    <div className="page-wrapper error-page-background">
      <h1 className={`error-page-header ${styles.font_40}`}>500</h1>
      <p className={`error-page-message ${styles.font_20}`}>
        Что-то пошло не так!
      </p>
      <ErrorPageLink />
    </div>
  )
}

export default Error5XX
