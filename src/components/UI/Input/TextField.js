import React, { useState } from "react";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { makeStyles, fade } from "@material-ui/core/styles";
import PropTypes from "prop-types";
const width = "100%";
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgba(0, 0, 0, 0.65)",
      padding: " 4px 11px"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(0, 0, 0, 0.65)"
    },
    "& .MuiOutlinedInput-root": {
      outline: "none",
      "& fieldset": {
        borderColor: " #d9d9d9",

        outline: "none",
        padding: "4px 11px"
      },
      "&:hover fieldset": {
        borderColor: "#40a9ff"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#40a9ff",
        borderWidth: "1px ",
        outline: "none",
        boxShadow: " 0 0 0 2px rgba(24, 144, 255, 0.2)"
      }
    }
  }
})(TextField);
//https://material-ui.netlify.com/components/text-fields/#customized-inputs
const styles = () => ({
  input: {
    height: "32px",

    boxSizing: "border-box",
    width: "100%",

    color: "rgba(0, 0, 0, 0.65)",
    fontSize: "14px",

    transition: "all 0.3s",
    outline: "none"
  }
});
const useStylesReddit = makeStyles(theme => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
}));
function RedditTextField(props) {
  const classes = useStylesReddit();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}
const MHTextField = ({ type, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  const { classes } = props;
  return (
    <TextField
      id="outlined-full-width"
       style={{ margin: 8 }}
      placeholder="Placeholder"
      helperText="Full width!"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
        borderColor: "#40a9ff",
        borderWidth: "1px ",
        outline: "none",
        boxShadow: " 0 0 0 2px rgba(24, 144, 255, 0.2)"
      }}
      variant="outlined"
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
MHTextField.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MHTextField);
