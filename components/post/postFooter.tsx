import styles from '../../styles/post.module.scss'
import PostComments from './postComments'
import PostActions from './postActions'
import { IPostProps } from '.'
import { TextField } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { addComment } from '../../redux/posts/actions'
import { IStoreState } from '../../interfaces/store'
import { connect } from 'react-redux'
import { useRef } from 'react'
interface IPostFooterProps extends IPostProps {
  isLogged: boolean
  addComment: Function
}
const PostFooter = (props: IPostFooterProps) => {
  const { item, isLogged, addComment } = props
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
      <PostActions item={item} />
      <div className={styles.postFooterDesc}>
        <p className={styles.postFooterUser}>{item.userName}</p>
        <p className={styles.postDesc}>{item.description}</p>
      </div>
      <PostComments item={item} />
      <div className={styles.postInfoDate}>
        <p>{item.createdAt}</p>
      </div>
      {isLogged ? (
        <div className={styles.addComment}>
          <form onSubmit={handleAddComment}>
            <TextField
              onKeyDown={handleKeySubmit}
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
const mapDispatchToProps = { addComment }
export default connect(mapsStateToProps, mapDispatchToProps)(PostFooter)
