import styles from "../../styles/loading.module.scss";
import Skeleton from "@material-ui/lab/Skeleton";

export default () => {
  return (
    <div className={styles.postComments}>
      <ul>
        <li>
          <Skeleton className={styles.commentItem} animation="wave" />
        </li>
        <li>
          <Skeleton className={styles.commentItem} animation="wave" />
        </li>
        <li>
          <Skeleton className={styles.commentItem} animation="wave" />
        </li>
      </ul>
    </div>
  );
};
