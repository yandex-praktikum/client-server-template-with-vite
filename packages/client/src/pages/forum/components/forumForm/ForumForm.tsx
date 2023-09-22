import { Button, Form, Input } from 'antd'
import classes from './styles.module.less'

const ForumForm: React.FC = () => {
  return (
    <div className={classes.forum__form}>
      <span className={classes.forum__formTitle}>Create New Forum </span>
      <Form>
        <Form.Item
          labelCol={{ span: 24 }}
          colon={false}
          label={
            <span className={classes.forum__formItemTitle}>Forum name</span>
          }
          name="forumName">
          <Input placeholder="Forum name" />
          <span className={classes.forum__formSubText}>
            Maximum length 80 symblols
          </span>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          colon={false}
          label={<span className={classes.forum__formItemTitle}>Comment</span>}
          name="comment">
          <Input.TextArea placeholder="Comment" />
          <span className={classes.forum__formSubText}>
            Maximum length 300 symblols
          </span>
        </Form.Item>
        <button className={classes.forum__formBtn}>Login</button>
      </Form>
    </div>
  )
}

export default ForumForm
