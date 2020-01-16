import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { withStyles, Button, Modal } from '@material-ui/core';
import styles from './styles';

import { getSchedules } from '../../../store/actions/project';
import CreateScheduleForm from './CreateScheduleForm/CreateScheduleForm';

const Schedules = props => {
  const { loading, classes, parameters, getSchedules, schedules } = props;
  const { projectId } = useParams();

  useEffect(() => {
    getSchedules(projectId);
  }, [getSchedules]);

  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const location = useLocation();

  return (
    <div>
      <div>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={handleOpen}
        >
          Create schedule
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <CreateScheduleForm />
          </div>
        </Modal>
      </div>
      <div>
        <p>List Schedules</p>
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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
