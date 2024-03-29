import { Container, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { env } from "process";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Categories from "./admin/Categories";
import Certifications from "./admin/Certifications";
import Dashboard from "./admin/Dashboard";
import Employers from "./admin/Employers";
import JobSeekers from "./admin/JobSeekers";
import Settings from "./admin/Settings";
import Skills from "./admin/Skills";
import Subscriptions from "./admin/Subscriptions";
import Technologies from "./admin/Technologies";
import "./App.css";
import Footer from "./components/Footer";
import SideDrawer from "./components/SideDrawer";
import Topbar from "./components/Topbar";
import ContactUs from "./contact/ContactUs";
import AppliedJobs from "./employee/appliedJobs/appliedJobs";
import Billing from "./employee/Billing";
import Profile from "./employee/components/Profile";
import JobseekerDashboard from "./employee/Dashboard/JobseekerDashboard";
import FavoriteOrganizations from "./employee/favoriteOrganizations/favoriteOrganizations";
import SavedJobs from "./employee/savedJobs/savedJobs";
import JobSeekerSettings from "./employee/Settings/Settings";
import Applications from "./employer/applications/applications";
import EmployerBilling from "./employer/Billing";
import Payment from "./employer/components/Payment";
import SuccessPayment from "./employer/components/SuccessPayment";
import EmployerDashboard from "./employer/Dashboard";
import Employer from "./employer/Employer";
import EmployerJobs from "./employer/Jobs";
import Organizations from "./employer/Organizations";
import EmployerSettings from "./employer/Settings";
import EmployerTechnologies from "./employer/Technologies";
import Home from "./home/Home";
import backgroundImage from "./images/background-image.jpg";
import JobDescription from "./jobDescription/jobDescription";
import CreateJobSetup from "./jobs/createJob/CreateJobSetup";
import DisplayJob from "./jobs/displayJobEmployer/displayJob";
import Jobs from "./jobs/Jobs";
// import CreateJobForm from "./jobs/createJob/createJobForm";
import People from "./people/People";
import Recommendations from "./recommendations/Recommendations";
import SearchResult from "./searchResults/searchResult";
import PrivacyPolicy from "./terms/PrivacyPolicy";
import TermsOfServices from "./terms/TermsOfServices";
import Pricing from "./pricing/Pricing";
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login user if localStorage contains a valid userToken
if (localStorage.getItem("userToken") && localStorage.getItem("loginId")) {
  jwt.verify(
    localStorage.getItem("userToken"),
    env.REACT_APP_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("loginId");
      }
      if (decoded) {
        sessionStorage.setItem("userToken", localStorage.getItem("userToken"));
        sessionStorage.setItem("loginId", localStorage.getItem("loginId"));
      }
    }
  );
}

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

  //Redirect user to sign in page if not logged in
  const token = sessionStorage.getItem("userToken");

  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.userRole
      : null
  );

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
          <SearchResult userRole={role} />
        </Route>
        <Route path="/jobs">
          <Jobs userRole={role} />
        </Route>
        {/* <Route path="/jobseeker" exact>
          <Profile />
        </Route> */}
        <Route path="/jobseeker/profile/:id">
          <Profile />
        </Route>
        <Route path="/organizations">
          <Organizations userRole={role} />
        </Route>
        <Route path="/jobDescription">
          <JobDescription userRole={role} />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        <Route path="/employer/profile/:id">
          <Employer userRole={role} />
        </Route>
        <Route path="/" exact>
          <Home userRole={role} />
        </Route>
        <Route path="/contactUs" exact>
          <ContactUs />
        </Route>
        <Route path="/termsOfService" exact>
          <TermsOfServices />
        </Route>
        <Route path="/privacy" exact>
          <PrivacyPolicy />
        </Route>
        <Route path="/pricing" exact>
          <Pricing />
        </Route>
      </>
    );
  };

  const loadJobSeeker = () => {
    if (role === "jobseeker") {
      return (
        <>
          <Route path="/jobseeker/appliedJobs">
            <AppliedJobs />
          </Route>
          <Route path="/jobseeker/suggestedJobs">
            <Recommendations />
          </Route>
          <Route path="/jobseeker/savedJobs">
            <SavedJobs />
          </Route>
          <Route path="/jobseeker/favoriteOrganizations">
            <FavoriteOrganizations />
          </Route>
          <Route path="/jobseeker/profile" exact>
            <Profile />
          </Route>
          <Route path="/jobseeker/dashboard" exact>
            <JobseekerDashboard userRole={role} />
          </Route>
          <Route path="/jobseeker/settings">
            <JobSeekerSettings />
          </Route>
          <Route path="/jobseeker/billing">
            <Billing />
          </Route>
        </>
      );
    }
  };

  const loadEmployer = () => {
    if (role === "employer") {
      return (
        <>
          <Route path="/employer/dashboard">
            <EmployerDashboard />
          </Route>
          <Route path="/employer/postAJob">
            <CreateJobSetup />
          </Route>
          <Route path="/employer/jobs/update/:jobId">
            <DisplayJob />
          </Route>
          <Route exact path="/employer/jobs">
            <EmployerJobs />
          </Route>
          <Route path="/employer/company">
            <Employer userRole={role} />
          </Route>
          <Route path="/employer/technologies">
            <EmployerTechnologies />
          </Route>
          <Route path="/employer/resumes">
            <Applications></Applications>
          </Route>
          <Route path="/employer/billing">
            <EmployerBilling />
          </Route>
          <Route path="/employer/payment/:package">
            <Payment />
          </Route>
          <Route path="/employer/success-payment">
            <SuccessPayment />
          </Route>
          <Route path="/employer/settings">
            <EmployerSettings />
          </Route>
        </>
      );
    }
  };

  const loadAdmin = () => {
    if (role === "admin") {
      return (
        <>
          <Route path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route path="/admin/categories">
            <Categories />
          </Route>
          <Route path="/admin/technologies">
            <Technologies />
          </Route>
          <Route path="/admin/certifications">
            <Certifications />
          </Route>
          <Route path="/admin/settings">
            <Settings />
          </Route>
          <Route path="/admin/jobSeekers">
            <JobSeekers />
          </Route>
          <Route path="/admin/employers">
            <Employers />
          </Route>
          <Route path="/admin/skills">
            <Skills />
          </Route>
          <Route path="/admin/pricing">
            <Subscriptions />
          </Route>
        </>
      );
    }
  };

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
                <Topbar user={role} />
              </Grid>
              <Grid
                container
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
                <Switch>{loadDefault()}</Switch>
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
