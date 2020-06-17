import action from "../actions";
import actionTypes from "./actionTypes";
import Http from "../../services/http";
import { IPost } from "../../interfaces";

export const getPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  console.log("hello");
  Http.get("/api/v1/posts")
    .then((response: any) => {
      let posts: Array<IPost> = [];
      response.map((item: any) => {
        let options = { year: "numeric", month: "long", day: "numeric" };
        let likes: number = Math.round(Math.random() * Math.floor(100));
        let comments = ["Nice", "Good", "Pretty", "Beautiful"];
        let date = new Date(item.createdAt);
        let newDate = date.toLocaleDateString("en-US", options);
        return posts.push({
          id: item.id,
          imageUrl: item.imageUrl,
          likes: likes,
          userName: item.userName,
          avatar: item.avatar,
          description: item.description,
          comments: comments,
          createdAt: newDate,
        });
      });
      dispatch(action(actionTypes.GET_POSTS_LOADED, { posts: posts }));
    })
    .catch((e) => {
      console.warn(e);
    });
};
