import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import JobTable from "./components/JobTable";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import NoAccess from "../components/NoAccess";
const jwt = require("jsonwebtoken");

let jobAccess = false;
let singleJobAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("alljobs")) {
    jobAccess = true;
  } else if (accessTokens.includes("singlejob")) {
    singleJobAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  container: {
    paddingTop: 20,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
    },
  },
  FeaturedOrganizations: {
    paddingTop: 25,
  },
  topBarGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      maxWidth: "unset",
    },
  },
  sideDrawerGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  Table: {
    marginLeft: 2,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: theme.palette.white,
    marginLeft: 12,
    marginBottom: 10,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: theme.palette.white,
    },
  },
}));

const EmployerJobList = () => {
  const classes = useStyles();

  const history = useHistory();
  const handleClick = () => history.push("../jobs/createJob/createJobSetup");

  return (
    <Grid
      container
      xs={12}
      spacing={3}
      direction="column"
      justify="space-between"
      alignItems="flex-start"
    >
      {jobAccess || singleJobAccess ? (
        <>
          <Grid item container xs={12} spacing={3}>
            <Link to="/employer/jobs/create">
              <Button
                variant="contained"
                className={classes.button}
                startIcon={<AddIcon />}
                // onClick={handleClick}
              >
                Add new job
              </Button>
            </Link>
          </Grid>
          <Grid item container xs={12} spacing={3} className={classes.Table}>
            <JobTable singleJobAccess={singleJobAccess}/>
          </Grid>

          <Grid item xs={12} spacing={3}></Grid>
        </>
      ) : (
        <NoAccess />
      )}
    </Grid>
  );
};

export default EmployerJobList;
