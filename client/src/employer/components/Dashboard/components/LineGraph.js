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
  Grid,
} from "@material-ui/core";
import FloatCard from "../../../../components/FloatCard";
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
import Theme from "../../../../Theme";
import { Line } from "react-chartjs-2";

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

  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  title2: {
    color: theme.palette.stateBlue,
    float: "Right",
    marginRight: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 50,
  },
  chart: {
  },
  legend: {
    marginBottom: -20,
  }
}));

const LineGraph = (props) => {

  const classes = useStyles();

  // Get dates for the graph
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

  const [value, setValue] = React.useState(2);

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`
      )
      .then((res) => {
        console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs,
          });
        }
      });
  }, []);

  const getTotalApplications = (date) => {

    var noOfApplications = 0;

    allJobs.forEach(job => {

      job.applicationDetails.forEach(jobApplication => {
        if (jobApplication.appliedDate.slice(0, 10) == date) {
          noOfApplications++
        }
      }
      );
    }
    );
    return noOfApplications;
  }


  const data = [getTotalApplications(day1full), getTotalApplications(day2full), getTotalApplications(day3full),
  getTotalApplications(day4full), getTotalApplications(day5full), getTotalApplications(day6full),
  getTotalApplications(day7full)];

  const labels = [day1, day2, day3, day4, day5, day6, day7];

  const generateLineChart = () => {
    return {
      labels: labels,
      datasets: [
        {
          label: "Job Count",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          data: data,
        },
      ],
    };
  };

  return (
    <FloatCard>
      <div style={{ padding: 10 }}>
        <Typography variant="h6" className={classes.title}>
          Applications
        </Typography>
        <Typography variant="body1" className={classes.title2}>
          This Week
        </Typography>

        <br />
        <Line height={120} data={generateLineChart({ fill: false })} />
      </div>
    </FloatCard>
  );
};

export default LineGraph;
