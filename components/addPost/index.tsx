import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/addPost.module.scss'
import { addPost } from '../../redux/posts/actions'
import { IStoreState } from '../../interfaces/store'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
interface IAppProps {
  open: boolean
  setOpen: Function
  loading: boolean
  addPost: Function
}
interface IPostData {
  desc: string
  photo: File
}
const AddDialog = (props: IAppProps) => {
  const { open, setOpen, loading, addPost } = props
  const [errorMessage, setErrorMessage] = useState('')
  const [image, setImage] = useState(null)
  const handleClose = () => {
    setOpen(false)
    setImage(null)
    setErrorMessage('')
  }
  const handleImage = (event) => {
    if (event.target.files) {
      var file = event.target.files[0]
      var fr = new FileReader()
      fr.onloadend = (e) => {
        setImage(e.target.result)
      }
      fr.readAsDataURL(file)
    }
  }
  const handleUpload = (event) => {
    event.preventDefault()
    let data = new FormData(event.target)
    if (!image) {
      setErrorMessage('Choose a photo')
      return
    } else {
      let object: IPostData = {
        desc: '',
        photo: null,
      }
      data.forEach((value, key) => {
        object[key] = value
      })

      addPost(
        object.desc,
        object.photo,
        () => {
          console.log('Post added')
          setImage(null)
          setErrorMessage('')
          setOpen(false)
        },
        (err) => {
          setErrorMessage(err)
        },
      )
    }
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <button onClick={handleClose} className={styles.closeButton}>
        <img src="/close.svg" alt="" />
      </button>
      <DialogTitle>Add post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleUpload}>
          <div className={styles.uploader}>
            <label className={styles.inputLabel} htmlFor="image-upload">
              <input name="photo" onChange={handleImage} id="image-upload" hidden type="file" accept="image/*" />
              <div className={styles.imagePreview}>
                {image ? <img src={image} alt="" /> : <FontAwesomeIcon icon={faCamera} />}
              </div>
            </label>
          </div>
          <textarea className={styles.inputField} name="desc" placeholder="Description" />
          <p className={styles.errorText}>{errorMessage}</p>
          <button type="submit" className={styles.confirmButton}>
            {loading ? <CircularProgress className={styles.loader} /> : 'Confirm'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const mapsStateToProps = (state: IStoreState) => {
  return {
    loading: state.posts.addLoading,
  }
}
const mapDispatchToProps = {
  addPost,
}
export default connect(mapsStateToProps, mapDispatchToProps)(AddDialog)
