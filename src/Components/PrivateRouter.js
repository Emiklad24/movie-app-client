import React from "react";
import { Route, Redirect } from "react-router-dom";
import useUserCredentialsStore from "../store/auth.store";
import shallow from "zustand/shallow";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
    }),
    shallow
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/join" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
