import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../../components/layout/NotFound';
import Alert from '../../components/layout/Alert';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../constants/routes';
import DefaultLayout from '../../hoc/Layout/DefaultLayout';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  const publicRoutes = () => {
    let xhtml = null;
    xhtml = PUBLIC_ROUTES.map(route => (
      <DefaultLayout
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    ));
    return xhtml;
  };
  const privateRoutes = () => {
    let xhtml = null;
    xhtml = PRIVATE_ROUTES.map(route => (
      <PrivateRoute
        key={route.path}
        path={route.path}
        component={route.component}
        exact={route.exact}
        name={route.name}
      />
    ));
    return xhtml;
  };
  return (
    <section className="container" style={{ height: '100%', width: '100%' }}>
      <Alert />
      <Switch>
        {publicRoutes()}
        {privateRoutes()}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
