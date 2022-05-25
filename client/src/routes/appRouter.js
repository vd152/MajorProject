import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../index.css";
import Home from "../components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataCreation from "../components/DataCreation";
import Autocomplete from "../components/Autocomplete"

const routes = (
  <React.Fragment>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={DataCreation} />
        <Route exact path="/autocomplete" component={Autocomplete} />
      </Switch>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
  </React.Fragment>
);
export default routes;
