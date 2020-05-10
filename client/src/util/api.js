import axios from "axios";

export default {
  setAuthHeader: () => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
  },
  setupInterceptors: history => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          localStorage.clear();
          document.cookie = "token=;";
          document.cookie = "userId=;";
          document.cookie = "user_name=;";
          window.location.href = "#/";
        }

        return Promise.reject(error);
      }
    );
  }
};
