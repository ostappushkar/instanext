import styles from '../../styles/postPageItem.module.scss'
import PostFooter from './postFooter'
import PostHeader from './postHeader'
import { IPost } from '../../interfaces/post'
export interface IPostProps {
  item: IPost
}

export default (props: IPostProps) => {
  const { item } = props
  return (
    <article className={styles.post}>
      <div className={styles.postContent}>
        <img src={item.imageUrl} />
      </div>
      <div className={styles.postText}>
        <PostHeader item={item} />

        <PostFooter item={item} />
      </div>
    </article>
  )
}
