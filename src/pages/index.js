import React from "react";
// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// pages
import Login from "./login";
import Dashboard from "./dashboard";
import Edit from "./Edit";
import Register from "./Register";
import Navbar from "../components/navbar";
import PrivateRoute from "./PrivateRoute";
import Error from "./Error";
import Home from "./Home";

const ReactRouterSetup = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/edit/:id" component={Edit} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default ReactRouterSetup;
