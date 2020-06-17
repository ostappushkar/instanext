import styles from "../../styles/post.module.scss";
import PostComments from "./postComments";
import { IPostProps } from "../../interfaces";
export default (props: IPostProps) => {
  const { item } = props;
  return (
    <div className={styles.postFooter}>
      <div className={styles.postInfoLikes}>
        <p className={styles.postLikes}>{item.likes} likes</p>
      </div>
      <div className={styles.postFooterDesc}>
        {" "}
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
