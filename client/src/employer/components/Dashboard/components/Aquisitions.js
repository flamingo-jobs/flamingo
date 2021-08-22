import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../../../components/FloatCard";
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
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
      {/* <Grid container direction="row" xs={12}>
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
      <Pie data={genPieData()} options={{
        plugins: {
          datalabels: {
            display: true,
            anchor: 'center',
            clam: true,
            formatter: (val, ctx) => {
              return val + " - " + ctx.chart.data.labels[ctx.dataIndex];
            },
            font: {
              weight: 'bold',
            },
            color: 'white'

          }
        },
      }} plugins={[ChartDataLabels]} />
    </FloatCard>
  );
};

export default Aquisitions;
