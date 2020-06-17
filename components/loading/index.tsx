import styles from "../../styles/loading.module.scss";
import LoadingFooter from "./loadingFooter";
import LoadingHeader from "./loadingHeader";
import Skeleton from "@material-ui/lab/Skeleton";
export default () => {
  return (
    <article className={styles.post}>
      <LoadingHeader />
      <div className={styles.postContent}>
        <Skeleton animation="wave" variant="rect" />
      </div>
      <LoadingFooter />
    </article>
  );
};
