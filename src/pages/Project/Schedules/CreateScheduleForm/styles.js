const styles = theme => ({
  root: {
    width: 800,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  rootStep2: {
    margin: 'auto',
  },
  cardHeaderStep2: {
    padding: theme.spacing(1, 2),
  },
  listStep2: {
    width: 'auto',
    height: 'auto',
    minWidth: 240,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  buttonStep2: {
    margin: theme.spacing(0.5, 0),
  },
});

export default styles;
