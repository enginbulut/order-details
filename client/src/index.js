import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./routing/configureStore";
import { router } from "./routing/router";
import createHistory from "history/createBrowserHistory";
import { CookiesProvider } from "react-cookie";
import utility from "./util/api";

import "./index.css";
// import "./NTCUIKit.css";

const history = createHistory();
const store = configureStore(undefined, history);
utility.setupInterceptors(history);

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>{router}</Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
