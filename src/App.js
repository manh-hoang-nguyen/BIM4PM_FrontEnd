import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/layout/Landing';
import theme from './shared/theme';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './utils/setAuthToken';

import Routes from './pages/routing/Routes';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

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
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
