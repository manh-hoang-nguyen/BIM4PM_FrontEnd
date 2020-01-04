import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header/Header';
import { withStyles } from '@material-ui/core';
import styles from './styles';

const AuthLayout = props => {
  const { children, classes, name } = props;
  return (
    <div className={classes.layout}>
      <Header name={name} />
      <div className={classes.wrapper}>
        <Sidebar />
        <div className={classes.wrapper}> {children}</div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  children: PropTypes.object,
};

export default withStyles(styles)(AuthLayout);
