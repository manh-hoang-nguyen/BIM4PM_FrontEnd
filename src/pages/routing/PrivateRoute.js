import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = props => {
  const {
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = { auth: PropTypes.object.isRequired};
const mapStateToProps = state => ({
    auth: state.auth
  });
export default connect(mapStateToProps)(PrivateRoute);
