import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Field, Form, useField } from "formik";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../../store/actions/auth";
import Spinner from "../../../components/UI/Spinner/Spinner";
import MHFeild from "../../../components/UI/Input/TextField";
import useStyles from "./styles";
import ClipLoader from "react-spinners/ClipLoader";
import SyncLoader from 'react-spinners/SyncLoader'
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email(),
  password: yup
    .string()
    .required("Password is required")
    .min(8)
});

const Login = ({ isAuthenticated, loading, login, authRedirectPath }) => {
  const classes = useStyles();
  const submitHandler = ({ email, password }) => {
    login(email, password);
  };

  let input = <Spinner />;

  if (isAuthenticated) {
    return <Redirect to={authRedirectPath} />;
  }
  return (
    <div className={classes.paper}>
      <Formik
        validateOnChange={true}
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div>
              <MHFeild
                className={classes.textFeild}
                placeholder="Email"
                name="email"
                variant="outlined"
              ></MHFeild>
            </div>
            <div>
              <MHFeild
                placeholder="Password"
                name="password"
                type="password"
                variant="outlined"
                InputProps={{ className: classes.textFeild }}
              ></MHFeild>
            </div>

            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
            
              type="submit"
            >
              <SyncLoader
                css={override}
                size={10}
                //size={"150px"} this also works
                color={"#50E3C2"}
                loading={loading}
              />{" "}
              {loading? null:"Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps, { login })(Login);
