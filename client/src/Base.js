import React, { useEffect, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import SideDrawer from "./components/SideDrawer";
import Grid from "@material-ui/core/Grid";
import Topbar from "./components/Topbar";
import backgroundImage from "./images/background-image.jpg";
import Footer from "./components/Footer";
import Home from "./home/Home";
import Profile from "./employee/components/Profile";
import "./App.css";
import { Route } from "react-router-dom";
import Jobs from "./jobs/Jobs";
import JobDescription from "./jobDescription/jobDescription";
import Categories from "./admin/Categories";
import CreateJobForm from "./jobs/createJob/createJobForm";
import People from './people/People';
import Employer from './employer/Employer';
import EmployerBilling from './employer/Billing';
import EmployerDashboard from './employer/Dashboard';
import EmployerJobList from './employer/EmployerJobList';
import Technologies from './admin/Technologies';
import { Switch } from "react-router-dom";
import Organizations from "./employer/Organizations";
import DisplayJob from './jobs/displayJobEmployer/displayJob';
import JobSeekers from "./admin/JobSeekers";
import Employers from "./admin/Employers";
import AppliedJobs from "./employee/appliedJobs/appliedJobs";
import JobseekerDashboard from "./employee/Dashboard/JobseekerDashboard";
import Dashboard from "./admin/Dashboard";
import SavedJobs from "./employee/savedJobs/savedJobs";
import FavoriteOrganizations from "./employee/favoriteOrganizations/favoriteOrganizations";
import Applications from "./employer/applications/applications";
import SearchResult from "./searchResults/searchResult";


const jwt = require("jsonwebtoken");
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: "100vh",
  },
  sideDrawer: {
    position: "fixed",
    minWidth: "17.9%",
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "16.66667%",
    },
  },
  sideDrawerGrid: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mainGrid: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  topBarGrid: {
    paddingTop: "22px !important",
    marginBottom: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      maxWidth: "unset",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  screen: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

function Base() {
  const classes = useStyles();

  //Redirect user to signin page if not logged in
  const token = sessionStorage.getItem("userToken");

  const [role, setRole] = useState(jwt.decode(token, { complete: true }) ? jwt.decode(token, { complete: true }).payload.userRole : null);

  useEffect(() => {
    loadEmployer();
    loadJobSeeker();
    loadAdmin();
    loadDefault();
  }, [role]);

  const loadDefault = () => {
    return (
      <>
        <Route path="/searchResults">
          <SearchResult userRole={role}/>
        </Route>
        <Route path="/jobs">
          <Jobs userRole={role} />
        </Route>
        {/* <Route path="/jobseeker" exact>
          <Profile />
        </Route> */}
        <Route path="/organizations">
          <Organizations userRole={role}/>
        </Route>
        <Route path="/jobDescription" >
          <JobDescription userRole={role} />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        <Route path="/employer/company">
          <Employer userRole={role} />
        </Route>
        <Route path="/" exact>
          <Home userRole={role}/>
        </Route>
      </>
    )
  }

  const loadJobSeeker = () => {
    if (role === "jobseeker") {
      return (
        <>
          <Route path="/jobseeker/appliedJobs">
            <AppliedJobs />
          </Route>
          <Route path="/jobseeker/savedJobs">
            <SavedJobs />
          </Route>
          <Route path="/jobseeker/favoriteOrganizations">
            <FavoriteOrganizations />
          </Route>
          <Route path="/jobseeker" exact>
            <Profile />
          </Route>
          <Route path="/jobseekerDashboard" exact>
            <JobseekerDashboard userRole={role}/>
          </Route>
        </>
      )
    }
  }

  const loadEmployer = () => {
    if (role === "employer") {
      return (
        <>
          <Route path="/employer/home">
            <EmployerDashboard/>
          </Route>
          <Route path="/employer/jobs/create">
            <CreateJobForm />
          </Route>
          <Route path="/employer/jobs/update">
            <DisplayJob />
          </Route>
          <Route exact path="/employer/jobs">
            <EmployerJobList/>
          </Route>
          {/* <Route path="/employer/company">
            <Employer userRole={role} />
          </Route> */}
          <Route path="/employer/analytics">
            Analytics
          </Route>
          <Route path="/employer/resumes">
            <Applications></Applications>
          </Route>
          <Route path="/employer/billing">
            <EmployerBilling/>
          </Route>
        </>
      );
    }
  };

  const loadAdmin = () => {
    if (role === "admin") {
      return (
        <>
         <Route path="/admin" exact>
            <Dashboard/>
          </Route>
          <Route path="/admin/categories">
            <Categories />
          </Route>
          <Route path="/admin/technologies">
            <Technologies />
          </Route>
          <Route path="/admin/jobSeekers">
            <JobSeekers />
          </Route>
          <Route path="/admin/employers">
            <Employers />
          </Route>
        </>
      )
    }
  }

  return (
    <div className={classes.root}>
      <div className="overlay">
        <Container maxWidth={false} className={classes.container}>
          <Grid
            container
            direction="row"
            spacing={3}
            className={classes.mainGrid}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              xs={false}
              sm={4}
              md={3}
              lg={2}
              className={classes.sideDrawer}
            >
              <SideDrawer user={role} />
            </Grid>

            <Grid
              item
              xs={false}
              sm={4}
              md={3}
              lg={2}
              className={classes.sideDrawerGrid}
            ></Grid>
            <Grid
              item
              container
              xs={12}
              sm={8}
              md={9}
              lg={10}
              spacing={3}
              className={classes.topBarGrid}
              direction="column"
              justify="space-between"
            >
              <Grid item sm={12}>
                <Topbar user={role}/>
              </Grid>
              <Grid
                container
                xs={12}
                spacing={0}
                direction="column"
                alignItems="center"
                className={classes.screen}
              >
                <Switch>
                  {loadEmployer()}
                  {loadJobSeeker()}
                  {loadAdmin()}
                </Switch>
                <Switch>
                  {loadDefault()}
                </Switch>
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
