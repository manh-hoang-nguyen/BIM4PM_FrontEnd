import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { fetchCatAndParam } from '../../../../store/actions/schedule';
import { useParams } from 'react-router-dom';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import {
  Checkbox,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';

const CreateScheduleForm = props => {
  const [checked, setChecked] = React.useState(false);
  const [parameters, setParameters] = React.useState([]);

  const handleChange = category => () => {
    const newParam = parameters.concat(category);
    setParameters(newParam);
  };

  const { fetchCatAndParam, paramCategories, loading } = props;
  const { projectId } = useParams();
  useEffect(() => {
    fetchCatAndParam(projectId);
  }, [fetchCatAndParam]);

  let xhtml;
  if (loading) {
    xhtml = <Spinner />;
  } else {
    xhtml = paramCategories.map(item => {
      return (
        <FormControlLabel
          key={item.category}
          control={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Checkbox onChange={handleChange(item.category)} />
          }
          label={item.category}
        />
      );
    });
  }
  return (
    <div>
      <FormControl>
        <FormLabel>Category</FormLabel>
        <FormGroup> {xhtml} </FormGroup>
      </FormControl>
    </div>
  );
};

CreateScheduleForm.propTypes = {
  fetchCatAndParam: PropTypes.func.isRequired,
  paramCategories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    paramCategories: state.schedule.paramCategories,
    loading: state.schedule.loading,
  };
};

const mapDispatchToProps = { fetchCatAndParam };

export default connect(mapStateToProps, mapDispatchToProps)(CreateScheduleForm);
