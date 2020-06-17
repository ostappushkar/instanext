import { useMemo } from "react";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import posts from "./posts";
import login from "./user";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { IStoreState } from "../interfaces";

let store;

let middleware = compose(applyMiddleware(logger, thunk));
let reducer = combineReducers({ login, posts });
const initStore = (preloadedState: IStoreState) => {
  return createStore(reducer, preloadedState, middleware);
};

export const initializeStore = (preloadedState: IStoreState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: IStoreState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
