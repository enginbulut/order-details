import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { routerMiddleware } from "react-router-redux";

const configureStore = (preloadedState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  const composed = [applyMiddleware(...middlewares)];

  //it is for make redux tab show up in development mode inspect
  if (process.env.NODE_ENV === "development") {
    middlewares.push(createLogger());
    const devExtension =
      window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_();
    if (devExtension) {
      composed.push(devExtension);
    }
  }
  const store = createStore(rootReducer, preloadedState, compose(...composed));
  return store;
};

export default configureStore;
