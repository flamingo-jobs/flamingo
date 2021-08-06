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
import DashboardNotifications from "./components/Dashboard/components/DashboardNotifications";
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

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container xs={12} spacing={1} direction="column">
        <Grid item>
          <Grid
            container
            xs={12}
            spacing={1}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            {/* Dashboard Left section */}
            <Grid item containerxs={12} sm={9} spacing={1}>
              <Grid item>
                <TopCards />
              </Grid>

              <Grid item container spacing={3}>
                <Grid item xs={8}>
                  <LineGraph className={classes.lineGraph} />
                </Grid>

                <Grid
                  container
                  direction="column"
                  item
                  xs={4}
                  spacing={1}
                  className={classes.aquisitions}
                >
                  {/* Aquisitions */}
                  <Grid item>
                    <Aquisitions />
                  </Grid>

                  {/* Notifications */}
                  <Grid item>
                    <NewApplicants />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Dashboard Right Section */}
            <Grid container direction="column" item xs={12} sm={3} spacing={1}>
              {/* Company Profile and stars */}
              <Grid item>
                <CompanySummaryCard />
              </Grid>

              {/* Notifications */}
              <Grid item>
                <DashboardNotifications />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <LatestJobs />
        </Grid>
       
      </Grid>

    
    </>
  );
};

export default Dashboard;
