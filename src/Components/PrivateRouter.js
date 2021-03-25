import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import FallbackSuspense from "./FallbackSuspense";

const PrivateRoute = ({
  isAuthLoading,
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthLoading === true && isAuthenticated === null ? (
          <FallbackSuspense />
        ) : isAuthLoading === false && isAuthenticated === false ? (
          <Redirect to="/join" />
        ) : isAuthLoading === false && isAuthenticated === null ? (
          <Redirect to="/join" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, {})(PrivateRoute);
