import { connect } from 'react-redux'
import styles from '../../styles/postPage.module.scss'
import { IStoreState } from '../../interfaces/store'
import { IPost } from '../../interfaces/post'
import Post from '../../components/postPageItem'
import { useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import Head from 'next/head'
import { getCurrentPost } from '../../redux/posts/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
interface IPostPageProps {
  post: IPost
  id: string
  getCurrentPost: Function
  loading: boolean
}
const PostPage = (props: IPostPageProps) => {
  const { post, getCurrentPost, loading, id } = props
  const handleBackClick = () => {
    Router.push('/')
  }
  useEffect(() => {
    getCurrentPost(id)
  }, [getCurrentPost])
  return (
    <section>
      <Head>
        <title>Post - Instogram</title>
      </Head>
      <main className={styles.container}>
        {loading ? (
          <CircularProgress />
        ) : post ? (
          <>
            <button onClick={handleBackClick} className={styles.backButton}>
              <FontAwesomeIcon icon={faLongArrowAltLeft} />
              Go back
            </button>{' '}
            <Post item={post} />
          </>
        ) : null}
      </main>
    </section>
  )
}
const mapsStateToProps = (state: IStoreState) => {
  return {
    post: state.posts.currentPost,
    loading: state.posts.loading,
  }
}
export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  }
}
const mapDispatchToProps = {
  getCurrentPost,
}
export default connect(mapsStateToProps, mapDispatchToProps)(PostPage)
