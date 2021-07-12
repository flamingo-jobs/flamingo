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
import Box from "@material-ui/core/Box";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

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
  notificationsIcon:{
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 70,
  },
  chart:{
      width: 150,
      height: 150,
      marginTop: -75,
      float: "center",
  },
}));

const Aquisitions = () => {

  const classes = useStyles();

  const [data, setData] = React.useState([
    { category: 'Applications', percentage: 12 },
    { category: 'Shortlisted', percentage: 7 },
    { category: 'On-Hold', percentage: 7 },
    { category: 'Rejected', percentage: 7 },
    ]);


  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          Aquisitions
        </Typography>
        <AssignmentIcon className={classes.notificationsIcon}/>


        <Chart
          data={data}
          className={classes.chart}
        >
          <PieSeries
            valueField="percentage"
            argumentField="category"
          />
          
          <Legend position="bottom"  className={classes.legend}/>
          <Animation />
        </Chart>


      </FloatCard>
    </div>
  );
};

export default Aquisitions;
