import React from 'react'
import classes from './styles.module.less'
import { Button } from 'antd'

type ErrorProps = {
    code: number;
    text: string;
}
const Error: React.FC<ErrorProps> = ({code, text}) => {
  return (
    <div className={classes.error}>
      <h1>{code}</h1>
      <h3>{text}</h3>
      <Button type="link" href='/'>Back to homepage</Button>
    </div>
  )
}

export default Error
