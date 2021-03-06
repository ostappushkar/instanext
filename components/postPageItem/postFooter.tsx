import styles from '../../styles/postPageItem.module.scss'
import PostComments from './postComments'
import PostActions from './postActions'
import { IPostProps } from '.'
import { TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { addComment } from '../../redux/posts/actions'
import { IStoreState } from '../../interfaces/store'
import { connect } from 'react-redux'
interface IPostFooterProps extends IPostProps {
  isLogged: boolean
}
const PostFooter = (props: IPostFooterProps) => {
  const { item, isLogged } = props
  const handleAddComment = (event) => {
    event.preventDefault()
    let data = new FormData(event.target)
    let object = { comment: '' }
    data.forEach((value, key) => {
      object[key] = value
    })
    if (object.comment) {
      addComment(item.id, object.comment, () => {
        console.log('Commented')
      })
      event.target.reset()
    }
  }
  return (
    <div className={styles.postFooter}>
      <div className={styles.postFooterDesc}>
        <p className={styles.postFooterUser}>{item.userName}</p>
        <p className={styles.postDesc}>{item.description}</p>
      </div>
      <PostComments item={item} />

      {isLogged ? (
        <div className={styles.addComment}>
          <form onSubmit={handleAddComment}>
            <TextField
              name="comment"
              rowsMax={4}
              placeholder="Add comment..."
              className={styles.commentField}
              multiline
            />
            <button>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
const mapsStateToProps = (state: IStoreState) => {
  return {
    isLogged: state.login.isLogged,
  }
}

export default connect(mapsStateToProps)(PostFooter)
