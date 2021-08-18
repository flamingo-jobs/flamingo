import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PieChart, {
  Legend,
  Export,
  Series,
  Label,
  Font,
  Connector,
} from "devextreme-react/pie-chart";
import { useState, useEffect } from "react";
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
    marginLeft: 80,
  },
  pieChart: {
    width: 200,
    height: 200,
    padding: "0 0 0 0",
    marginTop: -10,
    marginLeft: 20,
    marginBottom: -8,
    float: "center",
  },
  legend: {
    backgroundColor: theme.palette.white,
  },
}));

function customizeText(arg) {
  // return `${arg.valueText} (${arg.percentText})`;
  return `(${arg.percentText})`;
}

const Aquisitions = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

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

  const getTotalPending = () => {
    var totalPending = 0;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "pending") {
          totalPending++;
        }
      });
    });
    return totalPending;
  };

  const getTotalReviewing = () => {
    var totalReviewing = 0;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "reviewing") {
          totalReviewing++;
        }
      });
    });
    return totalReviewing;
  };

  const getTotalShortlisted = () => {
    var totalShortlisted = 5;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "shortlisted") {
          totalShortlisted++;
        }
      });
    });
    return totalShortlisted;
  };

  const getTotalRejected = () => {
    var totalRejected = 2;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "rejected") {
          totalRejected++;
        }
      });
    });
    return totalRejected;
  };

  const dataSource = [
    {
      category: "Pending",
      val: getTotalPending(),
    },
    {
      category: "Reviewing",
      val: getTotalReviewing(),
    },
    {
      category: "Shortlisted",
      val: getTotalShortlisted(),
    },
    {
      category: "Rejected",
      val: getTotalRejected(),
    },
  ];

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
              <PieChart
                id="pie"
                palette="Bright"
                dataSource={dataSource}
                className={classes.pieChart}
              >
                <Legend
                  orientation="horizontal"
                  itemTextPosition="right"
                  horizontalAlignment="center"
                  verticalAlignment="bottom"
                  columnCount={4}
                />
                {/* <Export enabled={true} /> */}

                <Series argumentField="category" valueField="val">
                  <Label
                    visible={true}
                    position="columns"
                    customizeText={customizeText}
                  >
                    <Font size={11} />
                    <Connector visible={true} width={0.5} />
                  </Label>
                </Series>
              </PieChart>
            </Grid>
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
};

export default Aquisitions;
