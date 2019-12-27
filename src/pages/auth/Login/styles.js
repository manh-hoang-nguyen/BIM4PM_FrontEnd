import { makeStyles } from "@material-ui/core/styles";

  const classes = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    
    flexDirection: "column",
    alignItems: "center",
    width:"50%"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  textFeild: {
    minWidth: 275,
    width: "100%",
    fontSize: "10px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default classes;
