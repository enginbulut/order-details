import {
  USER_CHANGE_TEXT,
  USER_ERROR,
  USER_FETCHED,
  USER_AUTHENTICATED,
  RESET_REDUX,
  CLEAR_USER_ERROR,
  AUTH_USER_STARTED
} from "../types";
import api from "../api/user";
import utility from "../util/api";

export const userAuthenticated = token => ({
  type: USER_AUTHENTICATED,
  payload: token
});

export const onChangeText = ({ prop, value }) => ({
  type: USER_CHANGE_TEXT,
  payload: { prop, value }
});

export const userFetched = user => ({
  type: USER_FETCHED,
  payload: user
});

export const loginHasError = error => ({
  type: USER_ERROR,
  payload: error
});

export const clearLoginError = () => ({
  type: CLEAR_USER_ERROR
});

export const authUserStarted = () => ({
  type: AUTH_USER_STARTED
});

export const resetRedux = () => ({
  type: RESET_REDUX
});

export const fetchUser = () => dispatch =>
  new Promise(function(resolve, reject) {
    utility.setAuthHeader();

    api
      .fetchUser()
      .then(data => {
        dispatch(userFetched(data.data));
        resolve(data);
      })
      .catch(err => {
        dispatch(loginHasError(err));
        reject(err);
      });
  });

export const authUserWithFetch = (username, password) => dispatch =>
  new Promise(function(resolve, reject) {
    utility.setAuthHeader();

    api
      .authUserWithFetch(username, password)
      .then(data => {
        dispatch(userAuthenticated(data.data));
        resolve(data);
      })
      .catch(err => {
        dispatch(loginHasError(err));
        reject(err);
      });
  });
