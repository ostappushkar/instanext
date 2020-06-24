import styles from '../../styles/post.module.scss'
import { IComment } from '../../interfaces/post'
import Link from 'next/link'
import { IPostProps } from '.'
export default (props: IPostProps) => {
  const { item } = props
  const comments = item.comments
  if (comments?.length) {
    return (
      <div className={styles.postComments}>
        <p className={styles.commentsLabel}>Comments:</p>
        <ul>
          {comments.length > 1 ? (
            comments.slice(0, 4).map((comment: IComment, index: number) => {
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
          {comments.length > 4 ? (
            <Link href={'/post/' + item.id}>
              <a>all comments ({comments.length - 1}) </a>
            </Link>
          ) : null}
        </ul>
      </div>
    )
  } else {
    return null
  }
}
