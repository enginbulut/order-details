import React from "react";
import { Route, HashRouter } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Login from "../components/Login";
import Home from "../components/Home";

const history = createHistory();

// build the router
const router = (
  <HashRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <div>
      <Route path="/netuce" component={Home} />
      <Route path="/" exact component={Login} />
    </div>
  </HashRouter>
);

// export
export { router };
