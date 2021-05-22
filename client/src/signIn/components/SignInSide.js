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
import FloatCard from '../../home/components/FloatCard';
import { Container } from '@material-ui/core';
import backgroundImage from '../images/background.jfif';

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

  },
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    minHeight: '100vh'
  },
  overlay: {
    backgroundColor: 'rgba(213, 239, 247, 0.605)',
    minHeight: '100vh',
},
  background: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundSize: 'cover',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.tuftsBlue,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 20,
    display: 'contents'
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
    height: '80vh',
  },
  textField: {
    margin: 10,
    width: 300
  },
  title: {
    marginBottom: 34
  }
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <div className={classes.background} >
      <div className={classes.overlay} >
    <Container className={classes.container}>
      <FloatCard backColor={theme.palette.flamingo}>
        <Grid container direction="row" className={classes.root}>
          <CssBaseline />

          <Grid item xs={12} sm={3} md={7} >

            <CardMedia
              className={classes.media}
              image={cardImage}
              title="Contemplative Reptile"
              alt="image"
            />

          </Grid>
          <Grid item xs={12} sm={9} md={5}>
            <FloatCard >
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                  Sign In
          </Typography>
                <form className={classes.form} noValidate >
                  <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
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
            </FloatCard>
          </Grid>
        </Grid>
      </FloatCard>
    </Container>
    </div>
    </div>
  );
}