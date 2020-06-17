import action from "../actions";
import actionTypes from "./actionTypes";
import Http from "../../services/http";
import { IPost } from "../../interfaces";
import { formatDistance } from "date-fns";
export const getPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  Http.get("/api/v1/posts/")
    .then((response: any) => {
      let posts: Array<IPost> = [];
      response.map((item: any) => {
        let likes: number = Math.round(Math.random() * Math.floor(100));
        let comments = ["Nice", "Good", "Pretty", "Beautiful"];
        let date = new Date(item.createdAt);
        return posts.push({
          id: item.id,
          imageUrl: item.imageUrl,
          likes: likes,
          userName: item.userName,
          avatar: item.avatar,
          description: item.description,
          comments: comments,
          createdAt: formatDistance(Date.now(), date, {
            addSuffix: true,
            includeSeconds: true,
          }),
        });
      });
      dispatch(action(actionTypes.GET_POSTS_LOADED, { posts: posts }));
    })
    .catch((e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, { error: e }));
      console.warn(e);
    });
};
