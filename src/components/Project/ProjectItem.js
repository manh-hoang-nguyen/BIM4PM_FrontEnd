import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

export const Project = props => {
  const { link, name, description, classes } = props;

  return (
    <div className={classes.root}>
      <a href={link}>
        <Typography variant="body1" className={classes.name}>
          {name}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
      </a>
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
