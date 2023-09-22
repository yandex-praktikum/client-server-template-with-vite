import PageFrame from '@/components/PageFrame/PageFrame'
import ForumTable from './components/forumTable/ForumTable'
import ForumForm from './components/forumForm/ForumForm'

const Forum: React.FC = () => {
  return (
    <PageFrame name="forum">
      <ForumTable />
      <ForumForm />
    </PageFrame>
  )
}

export default Forum
