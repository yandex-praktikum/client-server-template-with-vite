import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TForumDetails, TForumMessageCreation } from '../types'
import { MOCK_FORUMS_DETAILS } from '../mockForums'
import { ForumComment } from '../../../components/ForumComment'
import { ForumMessageForm } from '../../../components/ForumMessageForm'
import styles from './index.module.scss'
import { Avatar } from '../../../components/Avatar'

// TODO: рассмотреть динамическую пагинацию комментариев
export const ForumDetails = () => {
  const [forum, setForum] = useState<null | TForumDetails>(null)

  const { id } = useParams()

  const handleSubmit = (forumMessageCreation: TForumMessageCreation) => {
    if (forumMessageCreation.message) {
      console.log(forumMessageCreation.message)
    }
  }

  // Заглушка для отображения функционала лайков
  const handleLikeButtonClick = (commentId: string) => {
    const targetComment = forum?.comments.find(
      comment => comment.id === commentId
    )
    if (targetComment) {
      if (targetComment.isLiked) {
        targetComment.likesCount -= 1
        targetComment.isLiked = false
      } else {
        targetComment.likesCount += 1
        targetComment.isLiked = true
      }
    }
    if (forum) {
      setForum({ ...forum })
    }
  }

  useEffect(() => {
    setForum(MOCK_FORUMS_DETAILS.filter(forum => forum.id === id).at(0) ?? null)
  }, [id])

  if (!forum) {
    return (
      <h2 className={`${styles.font_32} ${styles.notFoundTitle}`}>
        Форум не найден
      </h2>
    )
  }

  return (
    <>
      <div className={styles.forum}>
        <Avatar imageUrl={null} size={60} />
        <div className={styles.forumText}>
          <h2 className={styles.font_20}>{forum.title}</h2>
          <h3 className={styles.font_16_500}>{forum.description}</h3>
        </div>
      </div>
      <div className={styles.commentsContainer}>
        <h4 className={`${styles.commentsDescription} ${styles.font_24}`}>
          Комментарии:
        </h4>
        <div className={styles.commentsWrapper}>
          {forum.comments.map(comment => (
            <ForumComment
              key={comment.id}
              comment={comment}
              handleLikeButtonClick={handleLikeButtonClick}
            />
          ))}
        </div>
        <ForumMessageForm handleSubmit={handleSubmit} />
      </div>
    </>
  )
}
