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
  const { fetchCatAndParam, paramCategories, loading } = props;
  const { projectId } = useParams();
  useEffect(() => {
    fetchCatAndParam(projectId);
  }, [fetchCatAndParam]);

  const [checked, setChecked] = React.useState(false);
  const [parameters, setParameters] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const handleChange = category => event => {
    let checkedCategory;
    let newParam;
    if (event.target.checked) {
      checkedCategory = [...new Set(categories.concat(category))];
      const para = Object.keys(paramCategories).map(key => {
        if (paramCategories[key].category === category) {
          return paramCategories[key].parameters;
        }
      });
      console.log(para);
    } else {
      checkedCategory = categories.filter(e => e !== category);
    }

    setCategories(checkedCategory);
  };
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
