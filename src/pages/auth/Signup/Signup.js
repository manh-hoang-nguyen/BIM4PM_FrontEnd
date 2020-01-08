import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Button, Card, CardContent } from '@material-ui/core';
import * as yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { register } from '../../../store/actions/auth';
import MHFeild from '../../../components/UI/Input/TextField';
import PropTypes from 'prop-types';
import styles from './styles';

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .required('Email is required')
    .email(),
  password: yup
    .string()
    .required('Password is required')
    .min(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Signup = ({ isAuthenticated, register, authRedirectPath, classes }) => {
  const submitHandler = ({ firstName, lastName, email, password }) => {
    register(firstName, lastName, email, password);
  };

  if (isAuthenticated) {
    return <Redirect to={authRedirectPath} />;
  }
  return (
    <div className={classes.background}>
      <div classes={classes.login}>
        <Card>
          <CardContent>
            <Formik
              validateOnChange
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                passwordConfirmation: '',
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
                  />
                  <MHFeild
                    placeholder="Last Name"
                    name="lastName"
                    variant="outlined"
                  />
                  <MHFeild
                    placeholder="Email"
                    name="email"
                    variant="outlined"
                  />
                  <div>
                    <MHFeild
                      placeholder="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                    />
                    <div>
                      <MHFeild
                        placeholder="Password Confirmation"
                        name="passwordConfirmation"
                        type="password"
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <Button
                    style={{ width: '100%' }}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    submit
                  </Button>
                  <p>
                    Have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

Signup.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  classes: PropTypes.object,
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps, { register })(
  withStyles(styles)(Signup),
);
