import React, { Fragment, useEffect } from "react";
import { BrowserRouter , Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./store/actions/auth";
import setAuthToken from "./utils/setAuthToken";

import Routes from "./pages/routing/Routes";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [loadUser]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
