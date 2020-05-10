import {
  USER_CHANGE_TEXT,
  USER_FETCHED,
  USER_ERROR,
  USER_AUTHENTICATED,
  CLEAR_USER_ERROR,
  AUTH_USER_STARTED,
  RESET_REDUX
} from "../types";

const INITIAL_STATE = {
  error: "",
  authUserGoingOn: false,
  token: "",
  userInfo: {}
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case USER_AUTHENTICATED: {
      return { ...state, userInfo: action.payload };
    }
    case USER_ERROR: {
      return { ...state, error: action.payload, authUserGoingOn: false };
    }
    case USER_CHANGE_TEXT: {
      return { ...state, [action.payload.prop]: action.payload.value };
    }
    case USER_FETCHED: {
      return { ...state, userInfo: action.payload, authUserGoingOn: false };
    }
    case CLEAR_USER_ERROR: {
      return { ...state, error: "", authUserGoingOn: false };
    }
    case AUTH_USER_STARTED: {
      return { ...state, authUserGoingOn: true };
    }
    case RESET_REDUX: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
};
