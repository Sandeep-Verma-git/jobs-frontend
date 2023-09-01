import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  const { user } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
