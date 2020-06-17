import { authRef } from "../../config/firebase";
import action from "../actions";
import actionTypes from "./actionTypes";
export const watchAuthState = () => (dispatch) => {
  authRef.onAuthStateChanged((user: firebase.User) => {
    user
      ? dispatch(
          action(actionTypes.GET_USER, { isLogged: true, currentUser: user })
        )
      : dispatch(
          action(actionTypes.GET_USER, { isLogged: false, currentUser: null })
        );
  });
};
