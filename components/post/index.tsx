import styles from "../../styles/post.module.scss";
import PostFooter from "./postFooter";
import PostHeader from "./postHeader";
import { IPostProps } from "../../interfaces";
export default (props: IPostProps) => {
  const { item } = props;
  return (
    <article className={styles.post}>
      <PostHeader item={item} />
      <div className={styles.postContent}>
        <img src={item.imageUrl} />
      </div>
      <PostFooter item={item} />
    </article>
  );
};
