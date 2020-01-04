const styles = theme => ({
  drawerPaper: {
    width: 240,
    maxWidth: 240,
    zIndex: theme.zIndex.drawer,
    height: '100%',
    position: 'relative',
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  menuLinkActive: {
    '&>div': {
      backgroundColor: theme.palette.grey.A200,
    },
  },
});

export default styles;
