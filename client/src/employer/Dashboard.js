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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "100vh",
  },

}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      xs={12}
      spacing={3}
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      {/* Dashboard Left section */}
      <Grid item containerxs={12} sm={9} spacing={3}>
        
      </Grid>

      {/* Dashboard Right Section */}
      <Grid container direction="column" item xs={12} sm={3} spacing={1}>

        {/* Company Profile and stars */}
        <Grid item>
          <CompanySummaryCard/>
        </Grid>

        {/* Notifications */}
        <Grid item>
          <DashboardNotifications/>
        </Grid>
      
      </Grid>

    </Grid>
  );
};

export default Dashboard;
