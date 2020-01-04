import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout from '../../hoc/Layout/AuthLayout/AuthLayout';

const PrivateRoute = props => {
  const { component: Component, isAuthenticated, ...rest } = props;

  return (
    <Route
      {...rest}
      render={
        props =>
          isAuthenticated === true ? (
            <AuthLayout {...rest}>
              <Component {...props} />
            </AuthLayout>
          ) : (
            <Redirect to="/login" />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(PrivateRoute);
