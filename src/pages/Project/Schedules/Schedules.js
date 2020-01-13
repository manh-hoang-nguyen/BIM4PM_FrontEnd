import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './styles';

import uppercaseFirstLetter from '../../../utils/uppercaseFirstLetterString';
import { getSchedules } from '../../../store/actions/project';
import CreateScheduleForm from './CreateScheduleForm/CreateScheduleForm';

const Schedules = props => {
  const {
    loading,

    classes,
    parameters,
    getSchedules,
    schedules,
  } = props;
  const { projectId } = useParams();
  useEffect(() => {
    getSchedules(projectId);
  }, [getSchedules]);

  const location = useLocation();

  return (
    <div>
      <div>
        <Link to={`${location.pathname}/schedule/create`}>
          Create Schedules
        </Link>
      </div>
      <div>
        {schedules.map(schedule => (
          <div key={schedule._id}>
            <Link to={`${location.pathname}/schedule/${schedule._id}`}>
              {schedule.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

Schedules.propTypes = {
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  getSchedules: PropTypes.func.isRequired,
  schedules: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  loading: state.schedule.loading,
  schedules: state.project.schedules,
});

const mapDispatchToProps = { getSchedules };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Schedules));