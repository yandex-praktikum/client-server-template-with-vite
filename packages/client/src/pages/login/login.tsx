import React from 'react'
import classes from '../signUp/styles.module.less'
import { Button, Form, Input } from 'antd'
import TetrisImg from '../../components/TetrisImg/Tetris'

const Login: React.FC = () => {
  return (
    <div className={classes.signUp}>
      <TetrisImg />
      <div className={classes.signUp__form}>
        <span className={classes.title}>Welcome to Tetris</span>
        <Form>
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
          <button
            className={classes.signUp__btn}
            style={{
              width: '100%',
            }}>
            Login
          </button>
          <Button
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
