import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useState, useEffect } from "react";
import {
  Chart,
  SeriesTemplate,
  CommonSeriesSettings,
  Title,
  Label,
  Format,
  Tooltip,
  Legend,
} from "devextreme-react/chart";
import axios from "axios";
import BACKEND_URL from "../../../../Config";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginRight: -12,
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
    marginLeft: 20,
  },
  barChart: {
    width: 200,
    height: 235,
  },
}));

const PopularJobs = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  function customizeTooltip(arg) {
    return {
      text: `${arg.seriesName} applications: ${arg.valueText}`,
    };
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`)
      .then((res) => {
        console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs,
          });
        }
      });
  }, []);

  const getPopularJobs = () => {
    var popularJobs = [];

    allJobs.forEach((job) => {
      popularJobs.push({
        job: job.title,
        applicants: job.applicationDetails.length,
      });
    });

    popularJobs.sort(function (a, b) {
      return b.length - a.length;
    });

    popularJobs.reverse();

    return popularJobs;
  };

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid container direction="row" xs={12}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              Most Popular Jobs
            </Typography>
            <FavoriteIcon className={classes.notificationsIcon} />
          </Grid>

          <Grid item container direction="row" xs={12}>
            <Chart
              id="chart"
            //   palette="#80FFDB, #4EA8DE"
              rotated={true}
              dataSource={getPopularJobs()}
              className={classes.barChart}
            >
              <CommonSeriesSettings
                argumentField="job"
                valueField="applicants"
                type="bar"
                barWidth={10}
                ignoreEmptyPoints={true}
                barPadding={0}
                hoverMode="allArgumentPoints"
                selectionMode="allArgumentPoints"
                color="#E366B3"
              />
              <Label visible={false}>
                <Format type="fixedPoint" precision={0} />
              </Label>
              <SeriesTemplate nameField="job" />
              <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
              <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="right"
              />
            </Chart>
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
};

export default PopularJobs;
