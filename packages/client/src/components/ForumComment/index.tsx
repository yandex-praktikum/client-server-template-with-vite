import { TComment } from '../../pages/Forum/types'
import { ReactComponent as Heart } from '../../assets/heart.svg'
import { convertISOtoTimeDateMonth } from '../../utils/dateConvertors'
import styles from './index.module.scss'
import { Avatar } from '../Avatar'

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
      <div className={styles.commentAvatarContainer}>
        <Avatar imageUrl={comment.user.avatar} />
      </div>
      <div className={styles.commentTextContainer}>
        <p className={`${styles.commentUsername} ${styles.font_16_500}`}>
          {comment.user.display_name}
        </p>
        <p className={`${styles.commentText} ${styles.font_16_500}`}>
          {comment.text}
        </p>
        <div className={styles.commentActions}>
          <button
            onClick={() => handleLikeButtonClick(comment.id)}
            className={styles.commentLikeButton}>
            <Heart
              fill={comment.isLiked ? '#DC143C' : '#686868'}
              className={styles.likeButtonImage}
            />
            <span className={styles.likeButtonCount}>{comment.likesCount}</span>
          </button>
          <span className={styles.font_13}>
            {convertISOtoTimeDateMonth(comment.date)}
          </span>
        </div>
      </div>
    </div>
  )
}
