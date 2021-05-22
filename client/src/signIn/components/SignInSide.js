import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import cardImage from '../../signIn/images/flamingo.gif';
import theme from '../../Theme';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Flamingo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'theme.palette.mediumTurquoise',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'theme.palette.mediumTurquoise',
      },
      '& .MuiOutlinedInput-root': {
          
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'theme.palette.mediumTurquoise',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'theme.palette.mediumTurquoise',
        },
      },
    },
  })(TextField);

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(25, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.tuftsBlue,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1), 
  },
  submit: {
    width: '30%',
    color: 'white',
    margin: ' 5% 35% 10% 35%',
    borderRadius: 25,
    padding: "10px 5px 10px 5px",
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlue,
      color: 'white',
  }
  },
  media: {
    height: '100vh',
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={3} md={6} >
      <Card boxShadow={3}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={cardImage}
          title="Contemplative Reptile"
          alt="image"
        />
        </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={9} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate >
          <CssTextField      
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            autoComplete="current-username"
            />
            <CssTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              style={{ marginTop: "5%" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs style={{ textAlign: 'left' }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item style={{ textAlign: 'right' }}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}