import React from 'react'
import { Container, makeStyles } from '@material-ui/core'
import SideDrawer from './components/SideDrawer'
import Grid from '@material-ui/core/Grid';
import Topbar from './components/Topbar';
import backgroundImage from './images/background-image.jpg';
import Footer from './components/Footer'
import Home from './home/Home';
import Profile from './employee/components/Profile';
import './App.css';
import { Route } from 'react-router-dom';
import Jobs from './jobs/Jobs';
import Employer from './employer/Employer';
import JobDescription from "./jobDescription/jobDescription";
import Categories from './admin/Categories';
import CreateJobForm from "./jobs/createJob/createJobForm";
import Organizations from './employer/Organizations';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    backgroundSize: 'cover',
  },
  container: {
    width: '100%',
    margin: '0 auto',
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: '100vh'
  },
  sideDrawer: {
    position: 'fixed',
    minWidth: '17.9%',
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    [theme.breakpoints.up('xl')]: {
      minWidth: '16.66667%',
    },
  },
  sideDrawerGrid: {
    marginTop: 10,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  mainGrid: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },

  },
  topBarGrid: {
    paddingTop: '22px !important',
    marginBottom: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      maxWidth: 'unset',
      paddingLeft: '0 !important',
      paddingRight: '0 !important'
    },
  },
  screen: {
    paddingTop: 10,
    paddingBottom: 10
  }
}));

function Base() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="overlay">
        <Container maxWidth={false} className={classes.container}>
          <Grid container direction="row" spacing={3} className={classes.mainGrid} justify="space-between"
            alignItems="flex-start">
            <Grid item xs={false} sm={4} md={3} lg={2} className={classes.sideDrawer}>
              <SideDrawer />
            </Grid>
            <Grid item xs={false} sm={4} md={3} lg={2} className={classes.sideDrawerGrid}></Grid>
            <Grid item container xs={12} sm={8} md={9} lg={10} spacing={3} className={classes.topBarGrid} direction="column"
              justify="space-between">
              <Grid item sm={12}>
                <Topbar />
              </Grid>
              <Grid container xs={12} spacing={0} direction="column" alignItems="center" className={classes.screen}>

                {/* start your routes here */}

                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/jobs" exact>
                  <Jobs />
                </Route>
                <Route path="/employee" exact>
                  <Profile />
                </Route>
                <Route path="/employer" exact>
                  <Employer />
                </Route>
                <Route path="/organizations" exact>
                  <Organizations />
                </Route>
                <Route path="/jobDescription" exact>
                  <JobDescription />
                </Route>
                <Route path="/admin/categories" exact>
                  <Categories />
                  </Route>
                <Route path="/createJob" exact>
                  <CreateJobForm />
                </Route>
                {/* ends your routes here */}

              </Grid>
              <Grid item xs={12}>
                <Footer />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>

  );
}

export default Base;
