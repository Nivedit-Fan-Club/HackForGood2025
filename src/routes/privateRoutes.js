import React from "react";
import { Redirect, Route } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("loginToken");

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;

