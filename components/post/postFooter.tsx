import styles from "../../styles/post.module.scss";
import PostComments from "./postComments";
import PostActions from "./postActions";
import { IPostProps } from ".";

export default (props: IPostProps) => {
  const { item } = props;
  return (
    <div className={styles.postFooter}>
      <PostActions item={item} />
      <div className={styles.postInfoLikes}>
        <p className={styles.postLikes}>{item.liked.length - 1} likes</p>
      </div>
      <div className={styles.postFooterDesc}>
        <p className={styles.postFooterUser}>{item.userName}</p>
        <p className={styles.postDesc}>{item.description}</p>
      </div>
      <PostComments comments={item.comments} />
      <div className={styles.postInfoDate}>
        <p>{item.createdAt}</p>
      </div>
    </div>
  );
};
