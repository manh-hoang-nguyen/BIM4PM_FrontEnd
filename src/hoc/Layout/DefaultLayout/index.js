import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';

const DefaultLayout = props => {
  const { component: YourComponent, ...remainProps } = props;
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...remainProps}
      render={routeProps => {
        return <YourComponent {...routeProps} />;
      }}
    />
  );
};

DefaultLayout.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  name: PropTypes.string,
};

export default DefaultLayout;
