import styles from '../../styles/postPageItem.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as Liked } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { IPostProps } from '.'
import { setLike } from '../../services/posts'
import { connect } from 'react-redux'
import { IStoreState } from '../../interfaces/store'
interface IPostActionsProps extends IPostProps {
  currentUser: firebase.User
}
const PostActions = (props: IPostActionsProps) => {
  const { item, currentUser } = props
  const handleLike = () => {
    setLike(item)
  }
  return (
    <div className={styles.postActions}>
      <div className={styles.likesWrapper}>
        <button onClick={handleLike} className={styles.actionButton}>
          <FontAwesomeIcon
            className={styles.likeIcon}
            icon={item.liked?.includes(currentUser?.uid) ? Liked : faHeart}
          />
        </button>

        <p className={styles.postLikes}>{item.liked.length - 1}</p>
      </div>
      <button className={styles.actionButton}>
        <FontAwesomeIcon icon={faComment} />
      </button>
      <button className={styles.actionButton}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  )
}

const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
  }
}

export default connect(mapsStateToProps)(PostActions)
