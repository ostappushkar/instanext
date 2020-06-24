import actionTypes from './actionTypes'
import { IPostState, IDispatchAction } from '../../interfaces/store'

export const postsState: IPostState = {
  loading: false,
  posts: [],
  error: null,
  userPosts: [],
  addLoading: false,
  newPostsAvailable: false,
  currentPost: null,
}

const reducer = (state = postsState, action: IDispatchAction) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.GET_POSTS_LOADED:
      return { ...state, loading: false, posts: action.payload.data.posts }
    case actionTypes.GET_USER_POSTS_LOADED:
      return { ...state, loading: false, userPosts: action.payload.data.posts }
    case actionTypes.LOADING_ERROR:
      return { ...state, loading: false, error: action.payload.error.error }
    case actionTypes.ADD_POST_LOADING:
      return { ...state, addLoading: true }
    case actionTypes.POST_ADDED:
      return { ...state, addLoading: false }
    case actionTypes.NEW_POSTS_AVAILABLE:
      return { ...state, newPostsAvailable: true }
    case actionTypes.GET_CURRENT_POST:
      return { ...state, loading: false, currentPost: action.payload.data.post }

    default:
      return state
  }
}
export default reducer
