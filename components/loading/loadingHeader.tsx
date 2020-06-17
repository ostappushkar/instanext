import styles from "../../styles/loading.module.scss";
import Skeleton from "@material-ui/lab/Skeleton";
export default () => {
  return (
    <header className={styles.postHeader}>
      <Skeleton
        animation="wave"
        variant="circle"
        width={32}
        height={32}
        className={styles.headerAvatar}
      />
      <h5 className={styles.headerUserName}>
        <Skeleton animation="wave" />
      </h5>
    </header>
  );
};
