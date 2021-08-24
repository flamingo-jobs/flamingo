import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CompanySummaryCard from "./components/Dashboard/components/CompanySummaryCard";
import PopularJobs from "./components/Dashboard/components/PopularJobs";
import TopCards from "./components/Dashboard/components/TopCards";
import Aquisitions from "./components/Dashboard/components/Aquisitions";
import LineGraph from "./components/Dashboard/components/LineGraph";
import NewApplicants from "./components/Dashboard/components/NewApplicants";
import LatestJobs from "./components/Dashboard/components/LatestJobs";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  aquisitions: {
    marginTop: 5,
  },
  lineGraph: {
    marginTop: 5,
    // marginBottom: -10,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (token === null) {
    loginId = props.employerID;
  } else if (header.payload.userRole === "employer") {
    login = true;
    loginId = sessionStorage.getItem("loginId");
  } else {
    loginId = props.employerID;
  }

  return (
    <>
      {/* <Grid container xs={12} spacing={1} direction="column">
        <Grid item>
          <Grid
            container
            xs={12}
            spacing={1}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >

            <Grid item containerxs={12} sm={9} spacing={1}>
              <Grid item>
                <TopCards employerId={loginId} />
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={8}>
                  <LineGraph
                    className={classes.lineGraph}
                    employerId={loginId}
                  />
                </Grid>

                <Grid
                  container
                  direction="column"
                  item
                  xs={4}
                  spacing={1}
                  className={classes.aquisitions}
                >
                   Aquisitions 
                  <Grid item>
                    <Aquisitions employerId={loginId} />
                  </Grid>

                   Notifications 
                  <Grid item>
                    <PopularJobs employerId={loginId} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

             Dashboard Right Section 
            <Grid container direction="column" item xs={12} sm={3} spacing={1}>
               Company Profile and stars 
              <Grid item>
                <CompanySummaryCard employerId={loginId} />
              </Grid>

               Notifications 
              <Grid item>
                <NewApplicants employerId={loginId} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <LatestJobs employerId={loginId} />
        </Grid>
      </Grid> */}

      <Grid item container xs={12} spacing={3} direction="row"
        justify="space-between"
        alignItems="streched">
        <Grid item xs={12} lg={6}>
          <TopCards employerId={loginId} />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Aquisitions employerId={loginId} />
        </Grid>
        <Grid item xs={12} md={6} lg={3} >
          <CompanySummaryCard employerId={loginId} />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LineGraph
                className={classes.lineGraph}
                employerId={loginId}
              />
            </Grid>
            <Grid item xs={12}>
              <LatestJobs employerId={loginId} />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <NewApplicants employerId={loginId} />
        </Grid>

      </Grid>
    </>
  );
};

export default Dashboard;
