import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import classes from './styles.module.less'
import { Button, ColProps, Form, Input, Modal } from 'antd'
import Avatar from '@/components/Avatar/Avatar'
import { UserContext } from '@/providers/userProvider/UserContext'
import { useForm } from 'antd/es/form/Form'
import {
  PasswordRequest,
  UserProfile,
  putChangePassword,
  putUserProfile,
} from '@/api/user'
import { ChangeAvatar } from '@/components/ChangeAvatar/ChangeAvatar'
import { getUserInfo } from '@/api/auth'
import PageFrame from '@/components/PageFrame/PageFrame'

interface FieldData {
  name: string | number | (string | number)[]
  value?: unknown
  touched?: boolean
  validating?: boolean
  errors?: string[]
}

function ObjectToFieldData<T extends Record<string, unknown>>(
  model: T
): FieldData[] {
  const res = [] as FieldData[]
  for (const [key, value] of Object.entries(model)) {
    res.push({
      name: key,
      value: value,
    })
  }
  return res
}

const Profile: React.FC = () => {
  const user = useContext(UserContext)
  const [avatar, setAvatar] = useState('')
  const [profileFields] = useState<FieldData[]>(ObjectToFieldData(user))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [passwordForm] = useForm()

  const memoizedProps = useMemo(() => {
    return { span: 24 } as ColProps
  }, [])

  useEffect(() => {
    setAvatar(user.avatar as string)
  }, [])
  const openChangePasswordDialog = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const openChangeAvatarDialog = useCallback(() => {
    setIsAvatarModalOpen(true)
  }, [])
  const cancelChangeAvatar = useCallback(() => {
    setIsAvatarModalOpen(false)
  }, [])

  const cancelChangePassword = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const changePassword = useCallback(async (values: PasswordRequest) => {
    await putChangePassword(values)
    setIsModalOpen(false)
  }, [])

  const changeProfileData = useCallback((values: UserProfile) => {
    putUserProfile(values)
  }, [])

  const onAvatarChanged = useCallback(() => {
    setIsAvatarModalOpen(false)
    setTimeout(() => {
      getUserInfo().then(u => setAvatar(u.avatar as string))
    }, 100)
  }, [])

  return (
    <PageFrame pageType="profile">
      <div className={classes.profile}>
        <Avatar size="md" img={avatar} />
        <Button onClick={openChangeAvatarDialog}>Change avatar</Button>
        <ChangeAvatar
          isOpen={isAvatarModalOpen}
          avatar={user.avatar as string}
          onCancel={cancelChangeAvatar}
          onOk={onAvatarChanged}
        />
        <div className={classes.profile__form}>
          <Form fields={profileFields} onFinish={changeProfileData}>
            <Form.Item
              labelCol={memoizedProps}
              colon={false}
              label={<span>First name</span>}
              name="first_name">
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              labelCol={memoizedProps}
              colon={false}
              label={<span>Second name</span>}
              name="second_name">
              <Input placeholder="Second name" />
            </Form.Item>
            <Form.Item
              labelCol={memoizedProps}
              colon={false}
              label={<span>Login</span>}
              name="login">
              <Input placeholder="Login" />
            </Form.Item>
            <Form.Item
              labelCol={memoizedProps}
              colon={false}
              label={<span>Email</span>}
              name="email">
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item
              labelCol={memoizedProps}
              colon={false}
              label={<span>Phone</span>}
              name="phone">
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item
              labelCol={memoizedProps}
              colon={false}
              label={<span>Display name</span>}
              name="display_name">
              <Input placeholder="Display name" />
            </Form.Item>
            <button type="submit" className={classes.profile__btn__primary}>
              Save
            </button>
            <Button
              className={classes.profile__btn}
              onClick={openChangePasswordDialog}>
              Change password
            </Button>
          </Form>
          <Modal
            open={isModalOpen}
            onCancel={cancelChangePassword}
            onOk={passwordForm.submit}>
            <Form
              className={classes.passwordForm}
              form={passwordForm}
              onFinish={changePassword}>
              <Form.Item name="oldPassword">
                <Input type="password" placeholder="Old password"></Input>
              </Form.Item>
              <Form.Item name="newPassword">
                <Input type="password" placeholder="New password"></Input>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </PageFrame>
  )
}

export default Profile
