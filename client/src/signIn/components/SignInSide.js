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
import FloatCard from '../../components/FloatCard';
import { Chip, Container, IconButton } from '@material-ui/core';
import backgroundImage from '../images/background.jfif';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import theme from '../../Theme';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

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

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.lightSkyBlue,
    color: theme.palette.stateBlue,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 20,
    display: 'contents'
  },
  submit: {
    width: '30%',
    boxShadow: 'none',
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    margin: ' 5% 35% 10% 35%',
    borderRadius: 25,
    padding: "10px 5px 10px 5px",
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlue,
      color: 'white',
      boxShadow: 'none'
    }
  },
  media: {
    height: '80vh',
  },
  textField: {
    margin: 10,
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: 250,
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + ' !important',
    },
  },
  title: {
    marginBottom: 20
  },
  animation: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  return: {
    alignSelf: 'self-start'
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

              <Grid item sm={5} md={7} className={classes.animation}>

                <CardMedia
                  className={classes.media}
                  image={cardImage}
                  alt="image"
                />

              </Grid>
              <Grid item xs={12} sm={7} md={5}>
                <FloatCard >
                  <div className={classes.paper}>
                    <Link to="/">
                      <Chip className={classes.return} clickable icon={<ArrowBackRoundedIcon />} label="Return" />
                    </Link>
                    <Typography component="h1" variant="h5" className={classes.title}>
                      Sign In
          </Typography>
                    <div className={classes.socialSection}>
                      <Typography className={classes.text}>
                        Use
            </Typography>
                      <div className={classes.icons}>
                        <IconButton >
                          <Avatar className={classes.avatar}>
                            <FacebookIcon />
                          </Avatar>
                        </IconButton>
                        <IconButton >
                          <Avatar className={classes.avatar}>
                            <LinkedInIcon />
                          </Avatar>
                        </IconButton>
                        <IconButton >
                          <Avatar className={classes.avatar}>
                            <GitHubIcon />
                          </Avatar>
                        </IconButton>


                      </div>
                      <Typography className={classes.text}>
                        Or
            </Typography>
                    </div>
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