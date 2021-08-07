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
import FloatCard from "../../FloatCard";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  area,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";


const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const demoStyles = () => ({
  chart: {
    paddingRight: '20px',
  },
});

const Area = props => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
      .curve(curveCatmullRom)}
  />
);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft:15,
    marginTop:5,
    marginRight: -15,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  title2:{
    color: theme.palette.stateBlue,
    float: "Right",
    marginRight:10,
  },
  notificationsIcon:{
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 50,
  },
  chart:{
      height: 300,
      width: 450,
      marginLeft: -480,
      marginTop: -20,
  },
  legend:{
      marginBottom: -20,
  }
}));

const LineGraph = () => {
  const classes = useStyles();
  var day1 = new Date();
  var day2 = new Date();
  var day3 = new Date();
  var day4 = new Date();
  var day5 = new Date();
  var day6 = new Date();
  var day7 = new Date();

  day6.setDate(day7.getDate() - 1);
  day5.setDate(day7.getDate() - 2);
  day4.setDate(day7.getDate() - 3);
  day3.setDate(day7.getDate() - 4);
  day2.setDate(day7.getDate() - 5);
  day1.setDate(day7.getDate() - 6);


  var dd7 = String(day7.getDate()).padStart(2, '0');
  var mm7 = String(day7.getMonth() + 1).padStart(2, '0'); 
  var yyyy7 = day7.getFullYear();
  day7 = mm7 + '/' + dd7;
  var day7full = yyyy7 + '-' + mm7 + '-' + dd7;

  var dd6 = String(day6.getDate()).padStart(2, '0');
  var mm6 = String(day6.getMonth() + 1).padStart(2, '0'); 
  var yyyy6 = day6.getFullYear();
  day6 = mm6 + '/' + dd6;
  var day6full = yyyy6 + '-' + mm6 + '-' + dd6;

  var dd5 = String(day5.getDate()).padStart(2, '0');
  var mm5 = String(day5.getMonth() + 1).padStart(2, '0'); 
  var yyyy5 = day5.getFullYear();
  day5 = mm5 + '/' + dd5;
  var day5full = yyyy5 + '-' + mm5 + '-' + dd5;

  var dd4 = String(day4.getDate()).padStart(2, '0');
  var mm4 = String(day4.getMonth() + 1).padStart(2, '0'); 
  var yyyy4 = day4.getFullYear();
  day4 = mm4 + '/' + dd4;
  var day4full = yyyy4 + '-' + mm4 + '-' + dd4;

  var dd3 = String(day3.getDate()).padStart(2, '0');
  var mm3 = String(day3.getMonth() + 1).padStart(2, '0'); 
  var yyyy3 = day3.getFullYear();
  day3 = mm3 + '/' + dd3;
  var day3full = yyyy3 + '-' + mm3 + '-' + dd3;

  var dd2 = String(day2.getDate()).padStart(2, '0');
  var mm2 = String(day2.getMonth() + 1).padStart(2, '0'); 
  var yyyy2 = day2.getFullYear();
  day2 = mm2 + '/' + dd2;
  var day2full = yyyy2 + '-' + mm2 + '-' + dd2;

  var dd1 = String(day1.getDate()).padStart(2, '0');
  var mm1 = String(day1.getMonth() + 1).padStart(2, '0'); 
  var yyyy1 = day1.getFullYear();
  day1 = mm1 + '/' + dd1;
  var day1full = yyyy1 + '-' + mm1 + '-' + dd1;


  const data = [
    {
      date: day1, applications: 59.8,
    }, {
      date: day2, applications: 74.2, 
    }, {
      date: day3, applications: 40, 
    }, {
      date: day4, applications: 22.6, 
    },{
      date: day5, applications: 22.6, 
    },{
      date: day6, applications: 22.6,  
    },{
      date: day7, applications: 22.6,  
    }];

  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          Applications
        </Typography>
        <Typography variant="body1" className={classes.title2}>
          This Week
        </Typography>

        <br />

        <div  style={{marginLeft: "500px", marginTop: "-20px"}}>
        <Chart
          data={data}
          className={classes.chart}
        >
          <ArgumentScale factory={scalePoint} />
          <ArgumentAxis />
          <ValueAxis />

          <AreaSeries
            name="Applications"
            valueField="applications"
            argumentField="date"
            seriesComponent={Area}
          />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text=" " />
        </Chart>
        </div>

      </FloatCard>
    </div>
  );
};

export default LineGraph;
