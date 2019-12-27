import React, { Component } from "react";
import * as yup from "yup";
import { connect } from "react-redux";
import MHTextField from "../../../components/UI/Input/TextField";
import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import SyncLoader from "react-spinners/SyncLoader";
import { create } from "../../../store/actions/project";
import { Redirect } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required("Project name is required"),
  description: yup
    .string()
    .required("Description is required")
    .max(50)
});

const CreateProjectForm = ({ create, project, loading }) => {
  const submitHandler = ({ name, description }) => {
    create(name, description);
  };

 
  return (
    <Formik
      validateOnChange={true}
      initialValues={{ name: "", description: "" }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <MHTextField placeholder="Project name" name="name"></MHTextField>
          </div>
          <div>
            <MHTextField placeholder="Project description" name="description" />
          </div>
          <Button
            style={{ width: "100%" }}
            disabled={isSubmitting}
            color="primary"
            type="submit"
          > Create
            <SyncLoader loading={loading}></SyncLoader>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  project: state.project.project,
  loading: state.project.loading
});

const mapDispatchToProps = { create };

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm);
