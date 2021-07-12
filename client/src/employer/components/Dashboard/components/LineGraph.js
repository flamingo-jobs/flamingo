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
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

const Line = props => (
    <LineSeries.Path
      {...props}
      path={line()
        .x(({ arg }) => arg)
        .y(({ val }) => val)
        .curve(curveCatmullRom)}
    />
  );
  
  const titleStyles = {
    title: {
      textAlign: 'center',
      width: '100%',
      marginBottom: '10px',
    },
  };
  const Text = withStyles(titleStyles)((props) => {
    const { text, classes } = props;
    const [mainText, subText] = text.split('\\n');
    return (
      <div className={classes.title}>
        <Typography component="h3" variant="h5">
          {mainText}
        </Typography>
        <Typography variant="subtitle1">{subText}</Typography>
      </div>
    );
  });
  
  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
  });
  const legendLabelStyles = theme => ({
    label: {
      marginBottom: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
  });
  const legendItemStyles = () => ({
    item: {
      flexDirection: 'column-reverse',
    },
  });
  
  const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
  );
  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
  );
  const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
  const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
  const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
  const demoStyles = () => ({
    chart: {
      paddingRight: '30px',
    },
  });
  


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
    // fontWeight: "bolder",
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

  const [data, setData] = React.useState([
    {
      country: 'Jan 01', hydro: 59.8, oil: 937.6, gas: 582, coal: 564.3, nuclear: 187.9,
    }, {
      country: 'Jan 02', hydro: 74.2, oil: 308.6, gas: 35.1, coal: 956.9, nuclear: 11.3,
    }, {
      country: 'Jan 03', hydro: 40, oil: 128.5, gas: 361.8, coal: 105, nuclear: 32.4,
    }, {
      country: 'Jan 04', hydro: 22.6, oil: 241.5, gas: 64.9, coal: 120.8, nuclear: 64.8,
    }]);

  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          Top Jobs
        </Typography>
        <Typography variant="body1" className={classes.title2}>
          This Month
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

          <LineSeries
            name="Applications"
            valueField="hydro"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Shortlisted"
            valueField="oil"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="On-Hold"
            valueField="gas"
            argumentField="country"
            seriesComponent={Line}
          />
          <LineSeries
            name="Rejected"
            valueField="gas"
            argumentField="country"
            seriesComponent={Line}
          />
          <Legend position="bottom" className={classes.legend}
          rootComponent={Root} itemComponent={Item} labelComponent={Label} />
          <Animation />
        </Chart>
        </div>

      </FloatCard>
    </div>
  );
};

export default LineGraph;
