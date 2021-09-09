import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { Bar } from "react-chartjs-2";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import SnackBarAlert from "../../../components/SnackBarAlert";

const ResumeBarChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyResumeCount, setMonthlyResumeCount] = useState([]);
  
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveResumeCount();
  }, []);

  const retrieveResumeCount = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getMonthlyResumes`
      );
      if (response.data.success) {
        setPastMonths(response.data.months);
        setMonthlyResumeCount(response.data.resumeCount);
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "Resume chart data could not be retrieved.",
      });
      handleAlert();
    }
  };

  const generateBarChart = () => {
    return {
      labels: pastMonths,
      datasets: [
        {
          label: "Resume Count",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          data: monthlyResumeCount,
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
        <Typography>Number of Resumes in Each Month</Typography>
        <Bar data={generateBarChart()} />
      </FloatCard>
    </div>
  );
};

export default ResumeBarChart;
