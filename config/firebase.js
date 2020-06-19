import * as firebase from "firebase";
import "firebase/auth";
export const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.REACR_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const persistance = firebase.auth.Auth.Persistence.LOCAL;
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const authRef = firebase.auth();
export const databaseRef = firebase.database().ref();
export const postsRef = databaseRef.child("posts");
