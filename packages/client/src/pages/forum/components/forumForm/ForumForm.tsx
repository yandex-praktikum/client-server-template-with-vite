import { Form, Input } from 'antd'
import classes from './styles.module.less'
import { useTopic } from '@/providers/userProvider/TopicContext'

const ForumForm: React.FC = () => {
  const { topicId } = useTopic()
  return (
    <div className={classes.forum__form}>
      {!topicId && (
        <span className={classes.forum__formTitle}>Create New Forum </span>
      )}
      <Form>
        {!topicId && (
          <Form.Item
            labelCol={{ span: 24 }}
            colon={false}
            label={
              <span className={classes.forum__formItemTitle}>Forum name</span>
            }>
            <Form.Item name="forumName" noStyle>
              <Input placeholder="Forum name" />
            </Form.Item>

            <span className={classes.forum__formSubText}>
              Maximum length 80 symblols
            </span>
          </Form.Item>
        )}

        <Form.Item
          labelCol={{ span: 24 }}
          colon={false}
          label={<span className={classes.forum__formItemTitle}>Comment</span>}>
          <Form.Item name="comment" noStyle>
            <Input.TextArea placeholder="Comment" />
          </Form.Item>
          <span className={classes.forum__formSubText}>
            Maximum length 300 symblols
          </span>
        </Form.Item>
        <button className={classes.forum__formBtn}>
          {!topicId ? 'Login' : 'Send'}
        </button>
      </Form>
    </div>
  )
}

export default ForumForm
