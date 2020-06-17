import actionTypes from "./actionTypes";
import { ILoginState, IDispathAction } from "../../interfaces";

const loginState: ILoginState = {
  isLogged: false,
  currentUser: null,
};

const loginReducer = (
  state = loginState,
  action: IDispathAction
): ILoginState => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        isLogged: action.payload.data.isLogged,
        currentUser: action.payload.data.currentUser,
      };
    default:
      return {
        ...state,
      };
  }
};
export default loginReducer;
