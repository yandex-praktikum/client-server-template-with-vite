import React from 'react'
import classes from './styles.module.less'

type ErrorMessageType = {
  message?: string | null
}

const ErrorMessage = ({ message }: ErrorMessageType) => {
  return <div className={classes.errorMessage}>{message}</div>
}

export default ErrorMessage
