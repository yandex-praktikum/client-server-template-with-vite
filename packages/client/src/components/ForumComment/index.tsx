import { TComment } from '../../pages/Forum/types'
import { ReactComponent as Heart } from '../../assets/heart.svg'
import { convertISOtoTimeDateMonth } from '../../utils/dateConvertors'
import styles from './index.module.scss'

type ForumCommentProps = {
  comment: TComment
  handleLikeButtonClick: (commentId: string) => void
}

export const ForumComment = ({
  comment,
  handleLikeButtonClick,
}: ForumCommentProps) => {
  return (
    <div className={styles.comment}>
      <img
        className={styles['comment-user-avatar']}
        src={comment.user.avatar}
        alt={comment.user.first_name}
      />
      <div className={styles['comment__text-container']}>
        <p className={`${styles['comment-username']} ${styles.font_16_500}`}>
          {comment.user.display_name}
        </p>
        <p className={`${styles['comment-text']} ${styles.font_16_500}`}>
          {comment.text}
        </p>
        <div className={styles['comment-actions']}>
          <button
            onClick={() => handleLikeButtonClick(comment.id)}
            className={styles['comment-like-button']}>
            <Heart
              fill={comment.isLiked ? '#DC143C' : '#686868'}
              className={styles['like-button-image']}
            />
            <span className={styles['like-button-count']}>
              {comment.likesCount}
            </span>
          </button>
          <span className={styles.font_13}>
            {convertISOtoTimeDateMonth(comment.date)}
          </span>
        </div>
      </div>
    </div>
  )
}
