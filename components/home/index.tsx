import { useState } from 'react'
import { connect } from 'react-redux'
import Post from '../post'
import styles from '../../styles/home.module.scss'
import Loading from '../loading'
import { IStoreState } from '../../interfaces/store/'
import { IPost } from '../../interfaces/post/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { isMobileOnly } from 'react-device-detect'
import AddDialog from '../addPost'
import Alert from '../snackbar'
interface IHomeProps {
  loading: boolean
  posts: IPost[]
  error: any
  isLogged: boolean
  newPostsAvailable: boolean
}
const Home = (props: IHomeProps) => {
  const { loading, posts, error, isLogged, newPostsAvailable } = props
  const [open, setOpen] = useState(false)
  const handleAddClick = () => {
    setOpen(true)
  }
  return (
    <main className={styles.container}>
      <div className={styles.pageTitle}>
        <h1>Posts .</h1>
        {isLogged && !isMobileOnly ? (
          <button onClick={handleAddClick} className={styles.addPostButton}>
            Add post <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        ) : null}
      </div>
      {loading ? <Loading /> : null}
      {error ? (
        <h3 className={styles.loadingError}>Loading error</h3>
      ) : (
        posts.map((post, index) => {
          return <Post item={post} key={index} />
        })
      )}
      <Alert alertOpen={newPostsAvailable} message="New Posts" />
      <AddDialog open={open} setOpen={setOpen} />
    </main>
  )
}
const mapsStateToProps = (state: IStoreState) => {
  return {
    loading: state.posts.loading,
    posts: state.posts.posts,
    error: state.posts.error,
    isLogged: state.login.isLogged,
    newPostsAvailable: state.posts.newPostsAvailable,
  }
}
export default connect(mapsStateToProps)(Home)
