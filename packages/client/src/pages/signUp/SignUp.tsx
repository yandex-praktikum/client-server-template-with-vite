import React, { useCallback } from 'react'
import classes from './styles.module.less'
import { Form, Input } from 'antd'
import Tetris from '@/components/TetrisImg/Tetris'
import { useForm } from 'antd/es/form/Form'
import { NewUser, postSignUp } from '@/api/auth'
import useMessage from 'antd/es/message/useMessage'
import { useNavigate } from 'react-router-dom'
import { urls } from '@/utils/navigation'

const SignUp: React.FC = () => {
  const [form] = useForm()
  const [messageApi] = useMessage()
  const navigate = useNavigate()
  const signUp = useCallback((values: NewUser) => {
    postSignUp(values)
      .then(() => navigate(urls.home))
      .catch(reason => {
        console.log(reason)
        messageApi.error('Could not create new user', 2)
      })
  }, [])
  return (
    <div className={classes.signUp}>
      <Tetris />
      <div className={classes.signUp__form}>
        <span className={classes.title}>Welcome to Tetris</span>
        <Form form={form} onFinish={signUp}>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>First name</span>}
            name="first_name">
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Second name</span>}
            name="second_name">
            <Input placeholder="Second name" />
          </Form.Item>
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
            label={<span>Email</span>}
            name="email">
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Phone</span>}
            name="phone">
            <Input placeholder="Phone" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Password</span>}
            name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>
          <button
            type="submit"
            className={classes.signUp__btn}
            style={{
              width: '100%',
            }}>
            Create account
          </button>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
