import React from "react";
import { Redirect } from "react-router-dom";
import { Formik, Field, Form, useField } from "formik";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { register } from "../../../store/actions/auth";
import MHFeild from "../../../components/UI/Input/TextField";
const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .required("Email is required")
    .email(),
  password: yup
    .string()
    .required("Password is required")
    .min(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

 
const Signup = ({ isAuthenticated, register,authRedirectPath }) => {
 
  const submitHandler = ({ firstName, lastName, email, password }) => {
    
    register(firstName, lastName, email, password);
  };

  if (isAuthenticated) {
    return <Redirect to={authRedirectPath} />;
  }
  return (
     <div  >

   
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <MHFeild
              placeholder="First Name"
              name="firstName"
              variant="outlined"
            ></MHFeild>
            <MHFeild
              placeholder="Last Name"
              name="lastName"
              variant="outlined"
            ></MHFeild>
            <MHFeild
              placeholder="Email"
              name="email"
              variant="outlined"
            ></MHFeild>
            <div>
              <MHFeild
                placeholder="Password"
                name="password"
                type="password"
                variant="outlined"
              ></MHFeild>
              <div>
                <MHFeild
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  type="password"
                  variant="outlined"
                ></MHFeild>
              </div>
             
            </div>
            <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                submit
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
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(mapStateToProps, { register })(Signup);
