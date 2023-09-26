import PageFrame from '@/components/PageFrame/PageFrame'
import ForumForm from './components/forumForm/ForumForm'
import ForumUp from './components/forumUp/ForumUp'

const Forum: React.FC = () => {
  return (
    <PageFrame>
      <ForumUp />
      <ForumForm />
    </PageFrame>
  )
}

export default Forum
