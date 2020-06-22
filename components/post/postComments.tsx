import styles from "../../styles/post.module.scss";
import { IComment } from "../../interfaces/post";
import { useState } from "react";
interface ICommentsProps {
  comments: Array<IComment>;
}
export default (props: ICommentsProps) => {
  const { comments } = props;
  const [visible, setVisible] = useState(5);
  if (comments?.length) {
    return (
      <div className={styles.postComments}>
        <p className={styles.commentsLabel}>Comments:</p>
        <ul>
          {comments.length > 1 ? (
            comments
              .slice(0, visible)
              .map((comment: IComment, index: number) => {
                return (
                  <li key={index} className={styles.postComment}>
                    <p>{comment.user}</p> {comment.comment}
                  </li>
                );
              }) && visible < comments.length ? (
              <button className={styles.loadMore}>load more...</button>
            ) : null
          ) : (
            <p className={styles.commentsLabel}>no comments</p>
          )}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};
