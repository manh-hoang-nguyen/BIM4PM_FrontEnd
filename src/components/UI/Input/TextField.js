import React, { useState } from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
const width = "100%";
const stylesFn = () => ({
  input: {
    height: "40px",
    margin: "5px"
  }
});
const MHTextField = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      InputProps={{
        className: props.classes.input, // usually you dont need this and you only need classes, but just wanted to show that you can use
        classes: {
          focused: props.classes.focused
          // because i used variant="outlined" i can pass any classes here that the OutlinedInput uses
        }
      }}
      style={{ width }}
      variant="outlined"
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default withStyles(stylesFn)(MHTextField);
