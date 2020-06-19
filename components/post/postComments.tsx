import styles from "../../styles/post.module.scss";
interface ICommentsProps {
  comments: Array<string>;
}
export default (props: ICommentsProps) => {
  const { comments } = props;
  if (comments?.length) {
    return (
      <div className={styles.postComments}>
        <p className={styles.commentsLabel}>Comments:</p>
        <ul>
          {comments.length > 1 ? (
            comments.map((comment: string, index: number) => {
              return (
                <li key={index} className={styles.postComment}>
                  {comment}
                </li>
              );
            })
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
