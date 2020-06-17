import styles from "../../styles/loading.module.scss";
import LoadingComments from "./loadingComments";
import Skeleton from "@material-ui/lab/Skeleton";
export default () => {
  return (
    <div className={styles.postFooter}>
      <div className={styles.postInfoLikes}>
        <Skeleton animation="wave" className={styles.postLikes} />
      </div>
      <div className={styles.postFooterDesc}>
        <Skeleton animation="wave" className={styles.postFooterUser} />
      </div>
      <LoadingComments />
      <div className={styles.postInfoDate}>
        <p className={styles.postDate}>
          <Skeleton animation="wave" className={styles.postFooterUser} />
        </p>
      </div>
    </div>
  );
};
