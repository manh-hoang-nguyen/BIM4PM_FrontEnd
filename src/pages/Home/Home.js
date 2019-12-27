import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import Axios from "axios";

import Spinner from "../../components/UI/Spinner/Spinner";
import ProjectItem from "../../components/Project/ProjectItem";
import { getProjects } from "../../store/actions/home";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
 

import Card from "@material-ui/core/Card"; 
import CardContent from "@material-ui/core/CardContent"; 
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Modal from '@material-ui/core/Modal';
import useStyles from "./style";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
 
import CreateProjectForm from "./CreateProjectForm/CreateProjectForm";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
 
const Home = props => {
  const { projects, loading, error, getProjects } = props;
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getProjects();
  }, [getProjects]);

  let fetchedProjects;
  fetchedProjects = <Spinner />;

  if (error !== null) fetchedProjects = <p> Projects can't be loaded</p>;

  if (error === null && !loading) {
    fetchedProjects = projects.map(project => (
      <ProjectItem
        link={`http://localhost:3000/projects/${project._id}`}
        key={project._id}
        name={project.name}
        description={project.description}
      />
    ));
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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
      <div >
        <Button onClick={handleOpen}>Create Project</Button>
        <Modal
        
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={handleClose}
        >
          <div style={{height: "auto"}} style={modalStyle} className={classes.paper}>
            <CreateProjectForm></CreateProjectForm>
            
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToprops = state => {
  return {
    projects: state.home.projects,
    loading: state.home.loading,
    error: state.home.error
  };
};

export default connect(mapStateToprops, { getProjects })(
  withErrorHandler(Home, Axios)
);
