import React, { useCallback, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@components/ErrorMesage/ErrorMessage'
import { postLoginUser, SignInType } from '@/api/auth'
import { urls } from '@/utils/navigation'
import classes from '../signUp/styles.module.less'
import TetrisImg from '../../components/TetrisImg/Tetris'

const Login: React.FC = () => {
  const [authError, setAuthError] = useState<string | null>(null)
  const navigate = useNavigate()

  const submitForm = useCallback((values: SignInType) => {
    if (values.login && values.password) {
      setAuthError(null)
      postLoginUser(values)
        .then(() => {
          navigate(urls.home)
        })
        .catch(({ error }) => {
          setAuthError(error.description)
        })
    }
  }, [])

  return (
    <div className={classes.signUp}>
      <TetrisImg />
      <div className={classes.signUp__form}>
        <span className={classes.title}>Welcome to Tetris</span>
        <Form onFinish={submitForm}>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Login</span>}
            name="login">
            <Input placeholder="Login" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Password</span>}
            name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <ErrorMessage message={authError} />
          <button
            className={classes.signUp__btn}
            type="submit"
            style={{
              width: '100%',
            }}>
            Login
          </button>
          <Button
            href={urls.signup}
            type="link"
            style={{
              width: '100%',
            }}>
            Don’t have an account?
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
