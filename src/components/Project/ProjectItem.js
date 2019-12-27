import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%", 
    color:"black",
    borderBottom: "1px solid #eef0f1"
  }
});
export const Project = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <a href={props.link}  >
        <Typography variant="h5" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {props.description}
        </Typography>
      </a>
    </div>
  );
};

export default Project;
