import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import MHTextField from '../../../components/UI/Input/TextField';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';
import SyncLoader from 'react-spinners/SyncLoader';
import { create } from '../../../store/actions/project';
import PropTypes from 'prop-types';

const validationSchema = yup.object({
  name: yup.string().required('Project name is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(50),
});

const CreateProjectForm = ({ create, loading }) => {
  const submitHandler = ({ name, description }) => {
    create(name, description);
  };

  return (
    <Formik
      validateOnChange
      initialValues={{ name: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <MHTextField placeholder="Project name" name="name" />
          </div>
          <div>
            <MHTextField placeholder="Project description" name="description" />
          </div>
          <Button
            style={{ width: '100%' }}
            disabled={isSubmitting}
            color="primary"
            type="submit"
          >
            {' '}
            Create
            <SyncLoader loading={loading} />
          </Button>
        </Form>
      )}
    </Formik>
  );
};
CreateProjectForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  create: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  project: state.project.project,
  loading: state.project.loading,
});

const mapDispatchToProps = { create };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm);
