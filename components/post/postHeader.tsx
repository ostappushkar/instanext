import styles from "../../styles/post.module.scss";
import { IPostProps } from ".";

export default (props: IPostProps) => {
  const { item } = props;
  return (
    <header className={styles.postHeader}>
      <img
        className={styles.headerAvatar}
        src={item.avatar}
        alt="User Avatar"
      />
      <h5 className={styles.headerUserName}>{item.userName}</h5>
    </header>
  );
};
