import React from 'react'
import classes from './styles.module.less'
import { Button, Form, Input, Modal } from 'antd'
import TetrisImg from './components/tetrisImg/Tetris'

const SignUp: React.FC = () => {
  return (
    <Modal
      className={classes.signUp}
      open
      width={800}
      closable={false}
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      footer={null}>
      <TetrisImg />
      <div>
        <span className={classes.title}>Welcome to Tetris</span>
        <Form>
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
            <Input placeholder="Password" />
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
    </Modal>
  )
}

export default SignUp
