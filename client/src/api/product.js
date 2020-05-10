import axios from "axios";
import { apiConstants } from "../constants";

const apiUrl = apiConstants.apiUrl;

export default {
  fetchProducts: () =>
    axios
      .get(`${apiUrl}/products/list`)
      .then(res => {
        console.log("fetchUser api res", res);
        return res.data.data;
      })
      .catch(err => {
        console.log("fetchUser api res err", err);
        return {};
      })
};
