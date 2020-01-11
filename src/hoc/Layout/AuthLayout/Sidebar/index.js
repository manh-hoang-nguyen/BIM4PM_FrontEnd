import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import styles from './styles';
import { withStyles, List, ListItem } from '@material-ui/core';
import { SIDEBAR_ROUTES } from '../../../../constants/routes';
import { NavLink } from 'react-router-dom';

const Sidebar = props => {
  const { classes } = props;
  const [open, setOpen] = useState(true);
  const toggleDrawer = value => {
    setOpen(value);
  };

  const renderList = () => {
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="div">
          {SIDEBAR_ROUTES.map(item => {
            return (
              <NavLink
                to={item.path}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
                key={item.path}
              >
                <ListItem key={item.path} className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
    );

    return xhtml;
  };

  return (
    <Drawer
      variant="persistent"
      classes={{ paper: classes.drawerPaper }}
      open={open}
      onClose={() => toggleDrawer(false)}
    >
      {renderList()}
    </Drawer>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Sidebar);
