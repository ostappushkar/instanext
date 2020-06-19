import { postsRef, authRef, databaseRef } from "../config/firebase";
import Http from "./http";
import IPost from "../interfaces/post";

export const addPost = (
  desc: string,
  photo: File,
  successCallback: () => void = () => {},
  errorCallback: (message: string) => void = () => {}
) => {
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
          successCallback();
        })
        .catch((e) => {
          const { message } = e;
          errorCallback(message);
        });
    })
    .catch((e) => {
      const { message } = e;
      errorCallback(message);
    });
};
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
        console.log(snapshot.val());
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
