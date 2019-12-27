import React, {  useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../store/actions/alert';
import { register } from '../../store/actions/auth';
import PropTypes from 'prop-types';

//Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Register = ({setAlert, register, isAuthenticated}) => {

  const classes = useStyles();

    const [formData, setFormData] = useState({ 
        firstName:'',
        lastName: '',
        email: '',
        password:'',
        password2:''

    });

    const {firstName, lastName, email, password, password2} = formData;
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit =async e =>{
      e.preventDefault();
      if(password2!==password){
        setAlert('Password do not match', 'danger');
      }else{
         
        register({firstName, lastName, email, password});
      }
    }

    if (isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    return (

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}  onSubmit={e => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange = {e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange = {e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange = {e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                minLength="8"
                value={password}
                onChange = {e => onChange(e)}
              />
              
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                minLength="8"
                value={password2}
                onChange = {e => onChange(e)}
              />
              
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    /*
        <Fragment>
             <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  name="firstName" 
                  value={firstName}
                  onChange = {e => onChange(e)}
                  required />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  name="lastName" 
                  value={lastName}
                  onChange = {e => onChange(e)}
                  required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email Address" name="email" value={email}  onChange = {e => onChange(e)} required/>
                <small className="form-text"
                  >This site uses Gravatar so if you want a profile image, use a
                  Gravatar email</small
                >
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange = {e => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  minLength="6"
                  value= {password2}
                  onChange = {e => onChange(e)}
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
              Already have an account? <Link href='/login'>Sign In</Link>
            </p>
        </Fragment>
        */
    )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps  = state => ({
  isAuthenticated:state.auth.isAuthenticated
  
})

export default connect(mapStateToProps, {setAlert, register}) (Register);
 