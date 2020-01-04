import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, Card, CardContent } from '@material-ui/core';
import * as yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../../../store/actions/auth';

import MHFeild from '../../../components/UI/Input/TextField';
import styles from './styles';

import SyncLoader from 'react-spinners/SyncLoader';
import { css } from '@emotion/core';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email(),
  password: yup
    .string()
    .required('Password is required')
    .min(8),
});

const Login = ({
  isAuthenticated,
  loading,
  login,
  authRedirectPath,
  classes,
}) => {
  const submitHandler = ({ email, password }) => {
    login(email, password);
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
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
            >
              {() => (
                <Form className={classes.form}>
                  <MHFeild placeholder="Email" name="email" />

                  <MHFeild
                    placeholder="Password"
                    name="password"
                    label="Password"
                    type="password"
                  />

                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    type="submit"
                  >
                    <SyncLoader
                      css={override}
                      size={10}
                      // size={"150px"} this also works
                      color="#50E3C2"
                      loading={loading}
                    />{' '}
                    {loading ? null : 'Login'}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(mapStateToProps, { login })(withStyles(styles)(Login));
