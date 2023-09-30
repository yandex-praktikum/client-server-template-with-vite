import React, { useContext } from 'react'
import classes from './styles.module.less'
import { Form, Input } from 'antd'
import Avatar from '@/components/Avatar/Avatar'
import { UserContext } from '@/providers/userProvider/UserContext'
import { baseApiUrl } from '@/api/api'

interface FieldData {
  name: string | number | (string | number)[];
  value?: unknown;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

function ObjectToFieldData<T extends Record<string, unknown>>(model: T): FieldData[] {
  const res = [] as Array<FieldData>;
  for(const [key,value] of Object.entries(model)) {
    res.push({
      name: key,
      value: value
    });
  }
  return res;
}

const Profile: React.FC = () => {
  const user = useContext(UserContext);
  const fields =  ObjectToFieldData(user);
  const resourcesUrl = baseApiUrl + 'resources';
  return (
    <div className={classes.profile}>
      <Avatar size='md' img={resourcesUrl + user.avatar}></Avatar>
      <div className={classes.profile__form}>
        <Form fields={fields}>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>First name</span>}
            name="first_name">
            <Input placeholder="First name"/>
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
            <Input placeholder="Phone"/>
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={<span>Display name</span>}
            name="display_name">
            <Input placeholder="Display name"/>
          </Form.Item>
          <button
            className={classes.profile__btn}
            style={{
              width: '100%',
            }}>
            Save
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Profile
