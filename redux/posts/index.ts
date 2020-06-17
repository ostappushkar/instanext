import actionTypes from "./actionTypes";
import { IPost, IPostsState, IDispathAction } from "../../interfaces";

export const postsState: IPostsState = {
  loading: false,
  posts: [],
};

const reducer = (state = postsState, action: IDispathAction) => {
  switch (action.type) {
    case actionTypes.GET_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_POSTS_LOADED:
      return { ...state, loading: false, posts: action.payload.data.posts };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
