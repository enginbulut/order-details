import {
  PRODUCTS_FETCHING,
  PRODUCTS_FETCHED,
  PRODUCTS_FETCHED_HAS_ERROR
} from "../types";

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  hasError: false,
  error: ""
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case PRODUCTS_FETCHING: {
      return { ...state, isLoading: true };
    }
    case PRODUCTS_FETCHED: {
      return { ...state, products: action.payload, isLoading: false };
    }
    case PRODUCTS_FETCHED_HAS_ERROR: {
      return {
        ...state,
        products: [],
        isLoading: false,
        hasError: true,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
