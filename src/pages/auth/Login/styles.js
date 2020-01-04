const styles = theme => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    flex: '1 0 auto',
  },

  form: {
    margin: 'auto',

    alignItems: 'center',
    display: 'block',
  },
  textFeild: {
    minWidth: 275,
    width: '100%',
  },
  submit: {},
});

export default styles;
