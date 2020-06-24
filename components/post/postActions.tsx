import styles from '../../styles/post.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as Liked } from '@fortawesome/free-solid-svg-icons'
import { faHeart, faComment, faPaperPlane, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { IPostProps } from '.'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { deletePost, setLike } from '../../services/posts'
import { connect } from 'react-redux'
import { useState } from 'react'
import { IStoreState } from '../../interfaces/store'
interface IPostActionsProps extends IPostProps {
  currentUser: firebase.User
}
const PostActions = (props: IPostActionsProps) => {
  const { item, currentUser } = props
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleDelete = () => {
    deletePost(item)
    setOpen(false)
  }
  const handleLike = () => {
    setLike(item)
  }
  return (
    <div className={styles.postActions}>
      <div>
        <button onClick={handleLike} className={styles.actionButton}>
          <FontAwesomeIcon
            className={styles.likeIcon}
            icon={item.liked?.includes(currentUser?.uid) ? Liked : faHeart}
          />
        </button>
        <button className={styles.actionButton}>
          <FontAwesomeIcon icon={faComment} />
        </button>
        <button className={styles.actionButton}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
      {item.authorId === currentUser?.uid ? (
        <button onClick={handleOpen} className={styles.deleteButton}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      ) : null}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm post delete</DialogContentText>
        </DialogContent>
        <DialogActions className={styles.dialogButtons}>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleDelete} autoFocus>
            Agree
          </button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapsStateToProps = (state: IStoreState) => {
  return {
    currentUser: state.login.currentUser,
  }
}

export default connect(mapsStateToProps)(PostActions)
