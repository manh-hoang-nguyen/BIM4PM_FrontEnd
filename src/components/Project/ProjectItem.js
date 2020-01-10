import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';
import { Link } from 'react-router-dom';

export const Project = props => {
  const { link, name, description, classes } = props;

  return (
    <div className={classes.root}>
      <Link to={link}>
        <Typography variant="body1" className={classes.name}>
          {name}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
      </Link>
      <Divider />
    </div>
  );
};
Project.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  classes: PropTypes.object,
};
export default withStyles(styles)(Project);
