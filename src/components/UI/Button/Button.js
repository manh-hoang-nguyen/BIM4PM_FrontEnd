/* eslint-disable react/prop-types */
import React from 'react';

import { Button, withStyles } from '@material-ui/core';
import styles from './styles';

const CustomButton = props => {
  const { classes, children } = props;
  return (
    <Button
      {...props}
      size="small"
      variant="outlined"
      color="primary"
      className={classes.button}
    >
      {children}
    </Button>
  );
};

export default withStyles(styles)(CustomButton);
