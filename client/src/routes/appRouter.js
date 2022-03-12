import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../index.css";
import Home from "../components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = (
  <React.Fragment>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="dark"
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
  </React.Fragment>
);
export default routes;
