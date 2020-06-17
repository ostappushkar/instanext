import styles from "../../styles/post.module.scss";
interface ICommentsProps {
  comments: Array<string>;
}
export default (props: ICommentsProps) => {
  const { comments } = props;
  return (
    <div className={styles.postComments}>
      <p className={styles.commentsLabel}>Comments:</p>
      <ul>
        {comments.map((comment: string, index: number) => {
          return (
            <li key={index} className={styles.postComment}>
              {comment}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
