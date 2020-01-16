import React from 'react';
import * as yup from 'yup';
import { connect } from 'react-redux';
import MHTextField from '../../../../components/UI/Input/TextField';
import { Formik, Form } from 'formik';
import { Button } from '@material-ui/core';

import { createSchedule } from '../../../../store/actions/project';
import PropTypes from 'prop-types';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { useParams } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup.string().required('Schedule name is required'),
});

const CreateProjectForm = ({ createSchedule, loading }) => {
  const { projectId } = useParams();

  const submitHandler = ({ name }) => {
    createSchedule(projectId, name);
  };

  return (
    <Formik
      validateOnChange
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <MHTextField placeholder="Schudule name" name="name" />
          </div>

          <Button
            style={{ width: '100%' }}
            disabled={isSubmitting}
            color="primary"
            type="submit"
          >
            Create
            <Spinner loading={loading} />
          </Button>
        </Form>
      )}
    </Formik>
  );
};
CreateProjectForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  createSchedule: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  loading: state.project.loading,
});

const mapDispatchToProps = { createSchedule };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm);
