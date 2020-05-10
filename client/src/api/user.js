import axios from "axios";
import { apiConstants } from "../constants";

const apiUrl = apiConstants.apiUrl;

export default {
  fetchUser: () =>
    axios
      .get(`${apiUrl}/users/current`)
      .then(res => {
        console.log("fetchUser api res", res);
        return res.data;
      })
      .catch(err => {
        console.log("fetchUser api res err", err);
        return {};
      }),

  authUserWithFetch: (email, password) =>
    axios
      .post(`${apiUrl}/users/login`, { email: email, password: password })
      .then(json => {
        axios.defaults.headers.common["Authorization"] = json.data.data;
        return json.data.data;
      })
      .catch(err => {
        throw err.response.data.error.user_authentication[0];
      })
};
