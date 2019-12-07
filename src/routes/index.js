import React, { useContext, useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import { AppContext, appReducer } from "../contexts";
import Home from "../pages/Home";
import Splash from "../pages/Splash";

const Routes = () => {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route path="/login" component={Splash} />
      </Switch>
    </AppContext.Provider>
  );
};

export default Routes;
