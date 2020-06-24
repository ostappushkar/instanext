import action from '../actions'
import actionTypes from './actionTypes'
import { formatDistanceStrict, formatDistance } from 'date-fns'
import { postsRef, authRef } from '../../config/firebase'
import Http from '../../services/http'
export const getPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING))
  postsRef.once(
    'value',
    (snapshot: firebase.database.DataSnapshot) => {
      let postsSnap = snapshot.val()
      let posts = []
      for (const post in postsSnap) {
        let comments = postsSnap[post].comments
        console.log(comments)
        if (comments.length > 1) {
          comments.forEach((comment) => {
            if (comment.date) {
              comment.date = formatDistanceStrict(Date.now(), comment.date, {
                addSuffix: false,
              })
            }
          })
        }
        posts.unshift({
          id: post,
          authorId: postsSnap[post].authorId,
          imageUrl: postsSnap[post].imageUrl,
          likes: postsSnap[post].likes,
          userName: postsSnap[post].userName,
          avatar: postsSnap[post].avatar,
          description: postsSnap[post].description,
          liked: postsSnap[post].liked,
          comments: comments,
          createdAt: formatDistance(Date.now(), postsSnap[post].createdAt, {
            addSuffix: true,
            includeSeconds: true,
          }),
        })
      }
      dispatch(action(actionTypes.GET_POSTS_LOADED, { posts: posts, newPostsAvailable: false }))
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, { error: e }))
      console.warn(e)
    },
  )
}
export const getCurrentPost = (postId: string) => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING))
  postsRef.child(postId).once(
    'value',
    (snapshot: firebase.database.DataSnapshot) => {
      let post = snapshot.val()
      post.createdAt = formatDistance(Date.now(), post.createdAt, {
        addSuffix: true,
        includeSeconds: true,
      })
      let comments = post.comments
      if (comments.length > 1) {
        comments.forEach((comment) => {
          if (comment.date) {
            comment.date = formatDistanceStrict(Date.now(), comment.date, {
              addSuffix: false,
            })
          }
        })
      }
      post.comments = comments
      dispatch(action(actionTypes.GET_CURRENT_POST, { post: post }))
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, { error: e }))
      console.warn(e)
    },
  )
}
export const postsWatcher = () => (dispatch) => {
  postsRef.on('child_added', () => {
    dispatch(action(actionTypes.NEW_POSTS_AVAILABLE, { newPostsAvailable: true }))
  })
}
export const getUserPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING))
  postsRef.once(
    'value',
    (snapshot: firebase.database.DataSnapshot) => {
      let postsSnap = snapshot.val()
      let posts = []
      for (const post in postsSnap) {
        if (postsSnap[post].authorId === authRef.currentUser.uid) {
          posts.unshift({
            id: post,
            liked: postsSnap[post].liked,
            authorId: postsSnap[post].authorId,
            imageUrl: postsSnap[post].imageUrl,
            likes: postsSnap[post].likes,
            userName: postsSnap[post].userName,
            avatar: postsSnap[post].avatar,
            description: postsSnap[post].description,
            comments: postsSnap[post].comments,
            createdAt: formatDistance(Date.now(), postsSnap[post].createdAt, {
              addSuffix: true,
              includeSeconds: true,
            }),
          })
        }
      }
      dispatch(action(actionTypes.GET_USER_POSTS_LOADED, { posts: posts }))
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, { error: e }))
      console.warn(e)
    },
  )
}
export const addPost = (
  desc: string,
  photo: File,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {},
) => (dispatch) => {
  dispatch(action(actionTypes.ADD_POST_LOADING))
  let formData = new FormData()
  formData.append('image', photo)
  Http.post('/3/image', formData)
    .then((res) => {
      postsRef
        .push({
          authorId: authRef.currentUser.uid,
          imageUrl: res.data.link,
          likes: 0,
          userName: authRef.currentUser.displayName,
          avatar: authRef.currentUser.photoURL,
          description: desc,
          comments: [''],
          liked: [''],
          createdAt: Date.now(),
        })
        .then(() => {
          dispatch(action(actionTypes.POST_ADDED))
          successCallback()
        })
        .catch((e) => {
          const { message } = e
          dispatch(action(actionTypes.POST_ADDED))
          errorCallback(message)
        })
    })
    .catch((e) => {
      const { message } = e
      dispatch(action(actionTypes.POST_ADDED))
      errorCallback(message)
    })
}
