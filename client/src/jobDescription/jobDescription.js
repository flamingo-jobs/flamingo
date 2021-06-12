import React, { Component } from "react";
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Custom components
import JobSummary from "./components/jobSummary";
import Responsibilities from "./components/responsibilities";
import Requirements from "./components/requirements";
import ApplyForm from "./components/applyForm";
// import backgroundImage from "./images/background.png";
import SideDrawer from "../components/SideDrawer";
import Topbar from "../components/Topbar";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: `url(${backgroundImage}) no-repeat`,
    // backgroundSize: "cover",
  },
  outterWrapper: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  topbar: {
    marginBottom: theme.spacing(2),
  },
  container: {
    border: "1px solid #5390d91A",
    borderRadius: 12,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    marginBottom: theme.spacing(2),
  },
  sideDrawerGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    padding: theme.spacing(2),
  },
}));

const JobDescription = () => {
  const { root, container,  outterWrapper, } = useStyles();

  return (
    <div className={root}>
      {/* <Grid container> */}
        <Grid item container className={outterWrapper} xs={12}>
          <Grid item sm={12}>
            <Container className={container}>
              <JobSummary></JobSummary>
            </Container>
          </Grid>
          <Grid item container sm={12} spacing={2}>
            <Grid item sm={6}>
              <Container className={container}>
                <Responsibilities></Responsibilities>
              </Container>
            </Grid>
            <Grid item sm={6}>
              <Container className={container}>
                <Requirements></Requirements>
              </Container>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Container className={container}>
              <ApplyForm></ApplyForm>
            </Container>
          </Grid>
        </Grid>
      {/* </Grid> */}
    </div>
  );
};

export default JobDescription;
