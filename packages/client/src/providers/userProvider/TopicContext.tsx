import { ReactNode, createContext, useContext, useState } from 'react'

const TopicContext = createContext<{
  topicId?: number | null
  setTopicId?: React.Dispatch<React.SetStateAction<number | null>>
}>({})

function useProvideTopic() {
  const [topicId, setTopicId] = useState<number | null>(null)

  return { setTopicId, topicId }
}
export function ProvideTopic({ children }: { children: ReactNode }) {
  const topicId = useProvideTopic()
  return (
    <TopicContext.Provider value={topicId}>{children}</TopicContext.Provider>
  )
}

export const useTopic = () => {
  return useContext(TopicContext)
}
