import action from "../actions";
import actionTypes from "./actionTypes";
import { formatDistance } from "date-fns";
import { postsRef, authRef } from "../../config/firebase";
import Http from "../../services/http";
export const getPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  postsRef.on(
    "value",
    (snapshot: firebase.database.DataSnapshot) => {
      let postsSnap = snapshot.val();
      let posts = [];
      for (const post in postsSnap) {
        posts.unshift({
          id: post,
          authorId: postsSnap[post].authorId,
          imageUrl: postsSnap[post].imageUrl,
          likes: postsSnap[post].likes,
          userName: postsSnap[post].userName,
          avatar: postsSnap[post].avatar,
          description: postsSnap[post].description,
          liked: postsSnap[post].liked,
          comments: postsSnap[post].comments,
          createdAt: formatDistance(Date.now(), postsSnap[post].createdAt, {
            addSuffix: true,
            includeSeconds: true,
          }),
        });
      }
      dispatch(action(actionTypes.GET_POSTS_LOADED, { posts: posts }));
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, { error: e }));
      console.warn(e);
    }
  );
};
export const getUserPosts = () => (dispatch) => {
  dispatch(action(actionTypes.GET_POSTS_LOADING));
  postsRef.on(
    "value",
    (snapshot: firebase.database.DataSnapshot) => {
      let postsSnap = snapshot.val();
      let posts = [];
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
          });
        }
      }
      dispatch(action(actionTypes.GET_USER_POSTS_LOADED, { posts: posts }));
    },
    (e) => {
      dispatch(action(actionTypes.LOADING_ERROR, null, { error: e }));
      console.warn(e);
    }
  );
};
export const addPost = (
  desc: string,
  photo: File,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => (dispatch) => {
  dispatch(action(actionTypes.ADD_POST_LOADING));
  let formData = new FormData();
  formData.append("image", photo);
  Http.post("/3/image", formData)
    .then((res) => {
      postsRef
        .push({
          authorId: authRef.currentUser.uid,
          imageUrl: res.data.link,
          likes: 0,
          userName: authRef.currentUser.displayName,
          avatar: authRef.currentUser.photoURL,
          description: desc,
          comments: [""],
          liked: [""],
          createdAt: Date.now(),
        })
        .then(() => {
          dispatch(action(actionTypes.POST_ADDED));
          successCallback();
        })
        .catch((e) => {
          const { message } = e;
          dispatch(action(actionTypes.POST_ADDED));
          errorCallback(message);
        });
    })
    .catch((e) => {
      const { message } = e;
      dispatch(action(actionTypes.POST_ADDED));
      errorCallback(message);
    });
};
