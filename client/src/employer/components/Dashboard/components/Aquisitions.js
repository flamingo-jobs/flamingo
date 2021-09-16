import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import FloatCard from "../../../../components/FloatCard";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Loading from '../../../../components/Loading';
import NotEnoughData from '../../../../components/NotEnoughData';

const useStyles = makeStyles((theme) => ({

  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 80,
  },
  pieChart: {
    width: 200,
    height: 200,
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
    allJobs: null,
  });

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`)
      .then((res) => {
        // console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs,
          });
        }
      });
  }, []);

  const getTotalPending = () => {

    if (!allJobs) {
      return 0;
    }
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
    if (!allJobs) {
      return 0;
    }
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
    if (!allJobs) {
      return 0;
    }
    var totalShortlisted = 0;

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
    if (!allJobs) {
      return 0;
    }
    var totalRejected = 0;

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
      color: "#ffce63"
    },
    {
      category: "Reviewing",
      val: getTotalReviewing(),
      color: "#eb78ff"
    },
    {
      category: "Shortlisted",
      val: getTotalShortlisted(),
      color: "#52ff52"
    },
    {
      category: "Rejected",
      val: getTotalRejected(),
      color: "#f52560"
    },
  ];

  const genPieData = () => {
    return {
      datasets: [
        {
          data: dataSource.filter(y => y.val !== 0).map(x => x.val),
          backgroundColor: dataSource.filter(y => y.val !== 0).map(x => x.color),
          label: "Categories",
        },
      ],
      labels: dataSource.filter(y => y.val !== 0).map(x => x.category),
    };
  };

  return (
    <FloatCard>
      {/* <Grid container direction="row">
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
        </Grid> */}

      <Typography>Aquisitions</Typography>
      {!allJobs ?
        <Loading /> : null
      }
      {allJobs && dataSource.map(x => x.val).reduce((x, y) => x + y) === 0 ?
        <NotEnoughData /> : null}
      {allJobs && allJobs.length > 0 && dataSource.map(x => x.val).reduce((x, y) => x + y) > 0 ?
        <Pie data={genPieData()} options={{
          plugins: {
            datalabels: {
              display: true,
              anchor: 'center',
              clam: true,
              formatter: (val, ctx) => {
                return val;
              },
              font: {
                weight: 'bold',
              },
              color: '#495357',
              backgroundColor: '#E7F7FF',
              padding: 4,
              borderRadius: 4

            }
          },
        }} plugins={[ChartDataLabels]} /> : null
      }
    </FloatCard>
  );
};

export default Aquisitions;
