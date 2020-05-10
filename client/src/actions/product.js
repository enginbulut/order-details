import {
  PRODUCTS_FETCHING,
  PRODUCTS_FETCHED,
  PRODUCTS_FETCHED_HAS_ERROR
} from "../types";

import api from "../api/product";
import utility from "../util/api";

export const productsFetching = () => ({
  type: PRODUCTS_FETCHING
});

export const productsFetched = products => ({
  type: PRODUCTS_FETCHED,
  payload: products
});

export const productsFetchedHasError = error => ({
  type: PRODUCTS_FETCHED_HAS_ERROR,
  payload: error
});

export const fetchProducts = () => dispatch =>
  new Promise(function(resolve, reject) {
    utility.setAuthHeader();
    dispatch(productsFetching());
    api
      .fetchProducts()
      .then(data => {
        dispatch(productsFetched(data));
        resolve(data);
      })
      .catch(err => {
        dispatch(productsFetchedHasError(err));
        reject(err);
      });
  });
