import { postsRef, authRef } from "../config/firebase";
import { IPost } from "../interfaces/post";

export const deletePost = (
  post: IPost,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => {
  if (post.authorId === authRef.currentUser.uid) {
    postsRef
      .child(post.id)
      .remove()
      .then(() => {
        successCallback();
      })
      .catch((e) => {
        const { message } = e;
        console.warn(e);
        errorCallback(message);
      });
  }
};
export const setLike = (
  post: IPost,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => {
  if (authRef.currentUser) {
    postsRef
      .child(post.id)
      .once("value")
      .then((snapshot: firebase.database.DataSnapshot) => {
        let likedArr: string[] = snapshot.val().liked;
        if (likedArr.includes(authRef.currentUser.uid)) {
          let index = likedArr.indexOf(authRef.currentUser.uid);
          likedArr.splice(index, 1);
          console.log("unliked");
        } else {
          likedArr.push(authRef.currentUser.uid);
          console.log("liked");
        }
        postsRef.child(post.id).update({ liked: likedArr }, (e) => {
          if (e) {
            console.warn(e);
          }
        });
        successCallback();
      })
      .catch((e) => {
        console.warn(e);
      });
  } else {
    errorCallback("Not logged in");
  }
};
export const addComment = (
  post: IPost,
  comment: string,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => {
  if (authRef.currentUser) {
    postsRef
      .child(post.id)
      .once("value")
      .then((snapshot: firebase.database.DataSnapshot) => {
        let commentsArr = snapshot.val().comments;
        commentsArr.push({
          user: authRef.currentUser.displayName,
          comment: comment,
          date:Date.now()
        });
        postsRef.child(post.id).update({ comments: commentsArr }, (e) => {
          if (e) {
            console.warn(e);
          }
        });
        successCallback();
      })
      .catch((e) => {
        console.warn(e);
      });
  } else {
    errorCallback("Not logged in");
  }
};
