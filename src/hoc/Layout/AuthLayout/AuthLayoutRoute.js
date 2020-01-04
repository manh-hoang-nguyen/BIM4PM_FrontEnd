import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

import AuthLayout from './AuthLayout';

const AuthLayoutRoute = props => {
  const { component: YourComponent, ...remainProps } = props;
  return (
    <Route
      {...remainProps}
      render={routeProps => {
        return (
          <AuthLayout {...remainProps}>
            <YourComponent {...routeProps} />
          </AuthLayout>
        );
      }}
    />
  );
};

AuthLayoutRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  name: PropTypes.string,
};

export default AuthLayoutRoute;
