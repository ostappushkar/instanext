import styles from '../../styles/postPageItem.module.scss'
import { IComment } from '../../interfaces/post'
import { IPostProps } from '.'
import { useState } from 'react'
export default (props: IPostProps) => {
  const { item } = props
  const [visible, setVisible] = useState(4)
  const comments = item.comments
  const handleLoadMore = () => {
    setVisible(visible + 4)
  }
  if (comments?.length) {
    return (
      <div className={styles.postComments}>
        <p className={styles.commentsLabel}>Comments:</p>
        <ul>
          {comments.length > 1 ? (
            comments.slice(0, visible).map((comment: IComment, index: number) => {
              return (
                <li key={index} className={styles.postComment}>
                  <span>
                    <b>{comment.user}</b> {comment.comment}
                  </span>
                  <p className={styles.commentDate}>{comment.date}</p>
                </li>
              )
            })
          ) : (
            <p className={styles.commentsLabel}>no comments</p>
          )}
          {comments.length > visible ? (
            <button className={styles.loadMore} onClick={handleLoadMore}>
              load more...
            </button>
          ) : null}
        </ul>
      </div>
    )
  } else {
    return null
  }
}
