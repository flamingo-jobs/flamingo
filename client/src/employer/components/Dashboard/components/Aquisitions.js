import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { useState, useEffect } from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginRight: -10,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 70,
  },
  pieChart: {
    width: 100,
    height: 100,
    padding: "0 0 0 0",
    marginTop: -180,
    marginLeft: 10,
    marginBottom: -180,
    float:"center",
  },
  legend:{
    backgroundColor: theme.palette.white,
  }
}));

const Aquisitions = () => {
  const classes = useStyles();

  const [data, setData1] = React.useState([
    { region: "Asia", val: 23 },
    { region: "Africa", val: 39 },
    { region: "Africa", val: 50 },
    { region: "Africa", val: 10 },
  ]);

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid container direction="row" xs={12}>
          <Grid item>
              <Typography variant="h6" className={classes.title}>
              Aquisitions
              </Typography>
              <AssignmentIcon className={classes.notificationsIcon} />
          </Grid>

          <Grid item container direction="row" xs={12}>

            <Grid item xs={6}>
              <Chart data={data} className={classes.pieChart}>
                <PieSeries
                  valueField="val"
                  argumentField="region"
                  // innerRadius={0.6}
                />
                <Animation />
              </Chart>
            </Grid>

            <Grid item xs={5}>
              <Chip
                icon={<FiberManualRecordIcon style={{color:'#32CD32'}}/>}
                label="Applications"
                className={classes.legend}
              />
              <Chip
                icon={<FiberManualRecordIcon style={{color:"orange"}}/>}
                label="Shortlisted"
                className={classes.legend}
              />
              <Chip
                icon={<FiberManualRecordIcon style={{color:'#5E60CE'}}/>}
                label="On-Hold"
                className={classes.legend}
              />
              <Chip
                icon={<FiberManualRecordIcon style={{color:"yellow"}}/>}
                label="Rejected"
                className={classes.legend}
              />
            </Grid>
   
        
          </Grid>

        </Grid>
        
        
      </FloatCard>
    </div>
  );
};

export default Aquisitions;
