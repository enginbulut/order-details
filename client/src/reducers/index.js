import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import UserReducer from "./UserReducer";
import ProductReducer from "./ProductReducer";

export default combineReducers({
  user: UserReducer,
  product: ProductReducer
});
