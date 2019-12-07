import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from "../../contexts";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props =>
        !state.isAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

export default ProtectedRoute;
