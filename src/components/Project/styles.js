const styles = theme => ({
  root: {
    width: '100%',
    margin: '0px',
    '&>a': {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
  },
  name: {
    color: theme.palette.text.primary,
  },
  description: {
    color: theme.palette.text.secondary,
  },
});

export default styles;
