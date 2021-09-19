import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { Line } from "react-chartjs-2";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import SnackBarAlert from "../../../components/SnackBarAlert";

const JobsLineChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyJobCount, setMonthlyJobCount] = useState([]);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveJobs();
  }, []);

  const retrieveJobs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/analytics/getMonthlyJobs`);
      if (response.data.success) {
        setPastMonths(response.data.months);
        setMonthlyJobCount(response.data.jobCount);
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "Jobs chart data could not be retrieved.",
      });
      handleAlert();
    }
  };

  const generateLineChart = () => {
    return {
      labels: pastMonths,
      datasets: [
        {
          label: "Job Count",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          tension: 0.4,
          data: monthlyJobCount,
        },
      ],
    };
  };

  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  return (
    <div>
      {displayAlert()}

      <FloatCard>
        <Typography>Jobs Created for the Past 8 Months</Typography>
        <Line data={generateLineChart({fill: false})} />
      </FloatCard>
    </div>
  );
};

export default JobsLineChart;
