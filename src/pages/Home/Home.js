import { Button, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProjectItem from '../../components/Project/ProjectItem';
import { css } from '@emotion/core';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchProjects } from '../../store/actions/home';
import CreateProjectForm from './CreateProjectForm/CreateProjectForm';
import SyncLoader from 'react-spinners/SyncLoader';
import PropTypes from 'prop-types';
import styles from './styles';

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

const Home = props => {
  const { projects, loading, error, fetchProjects, classes } = props;

  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  let fetchedProjects;
  fetchedProjects = (
    <SyncLoader
      css={override}
      size={10}
      // size={"150px"} this also works
      color="#50E3C2"
    />
  );

  if (error !== null) fetchedProjects = <p> Projects can not be loaded</p>;

  if (error === null && !loading) {
    fetchedProjects = projects.map(project => (
      <ProjectItem
        link={`http://localhost:3000/project/${project._id}`}
        key={project._id}
        name={project.name}
        description={project.description}
      />
    ));
  }
  return (
    <div className={classes.root}>
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Projects
            </Typography>
            {fetchedProjects}
          </CardContent>
        </Card>
      </div>
      <div>
        <Button onClick={handleOpen}>Create Project</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <CreateProjectForm />
          </div>
        </Modal>
      </div>
    </div>
  );
};

Home.propTypes = {
  projects: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object,
  fetchProjects: PropTypes.func.isRequired,
};

const mapStateToprops = state => {
  return {
    projects: state.home.projects,
    loading: state.home.loading,
    error: state.home.error,
  };
};

export default connect(mapStateToprops, { fetchProjects })(
  withErrorHandler(withStyles(styles)(Home), Axios),
);
