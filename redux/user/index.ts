import actionTypes from "./actionTypes";
import { ILoginState, IDispatchAction } from "../../interfaces/store/";

const loginState: ILoginState = {
  isLogged: false,
  currentUser: null,
};

const loginReducer = (
  state = loginState,
  action: IDispatchAction
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
