/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

import styles from './style';

const MHTextField = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const { classes } = props;
  return (
    <TextField
      className={classes.margin}
      id="outlined-full-width"
      placeholder="Placeholder"
      helperText="Full width!"
      fullWidth
      margin="normal"
      type={type}
      placeholder={placeholder}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
MHTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default withStyles(styles)(MHTextField);
