import Table from 'rc-table'
import classes from './styles.module.less'
import avatar from '../../../../../public/user.svg'
import { RowProps } from 'antd'
import ForumTopics from '../forumTopics/ForumTopics'
import { useTopic } from '@/providers/userProvider/TopicContext'

const tableItems = [
  {
    label: 'Competitions',
    topics: 12,
    posts: 12,
    id: 1,
    lastPost: {
      date: '1monts, 2 weeks ago',
      author: 'Lem Stanislav',
    },
  },
  {
    label: 'Topic 1',
    topics: 12,
    posts: 12,
    id: 2,
    lastPost: {
      date: '1monts, 2 weeks ago',
      author: 'Lem Stanislav',
    },
  },
  {
    label: 'Topic 2',
    id: 3,
    topics: 12,
    posts: 12,
    lastPost: {
      date: '1monts, 2 weeks ago',
      author: 'Lem Stanislav',
    },
  },
  {
    label: 'Topic 3',
    topics: 12,
    posts: 12,
    id: 4,
    lastPost: {
      date: '1monts, 2 weeks ago',
      author: 'Lem Stanislav',
    },
  },
]
const ForumUp: React.FC = () => {
  const { topicId, setTopicId } = useTopic()

  if (topicId) {
    return <ForumTopics />
  }

  return (
    <Table
      className={classes.forum__table}
      rowClassName={classes.forum__tableRow}
      rowKey="id"
      components={{
        header: {
          row: (props: RowProps) => (
            <tr {...props} className={classes.forum__tableHead} />
          ),
          cell: (props: any) => (
            <td {...props} className={classes.forum__tableHeaderCell} />
          ),
        },
        body: {
          cell: (props: any) => (
            <td {...props} className={classes.forum__tableBodyCell} />
          ),
        },
      }}
      onRow={record => ({
        onClick: e => {
          if (setTopicId) {
            setTopicId(record.id as number)
          }
        },
      })}
      columns={[
        {
          title: 'Forum',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: 'Topics',
          dataIndex: 'topics',
          key: 'topics',
          render(value) {
            return <span className={classes.forum__count}>{value}</span>
          },
        },
        {
          title: 'Posts',
          dataIndex: 'posts',
          key: 'posts',
          render(value) {
            return <span className={classes.forum__count}>{value}</span>
          },
        },
        {
          title: 'Last Post',
          dataIndex: 'lastPost',
          key: 'lastPost',
          render(value) {
            return (
              <div className={classes.forum__author}>
                <span className={classes.forum__authorDate}>{value.date}</span>
                <div className={classes.forum__authorInner}>
                  <img src={avatar} />
                  <div className={classes.forum__authorName}>
                    {value.author}
                  </div>
                </div>
              </div>
            )
          },
        },
      ]}
      data={tableItems}
    />
  )
}

export default ForumUp
