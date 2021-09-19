import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import SnackBarAlert from "../../../components/SnackBarAlert";

const UsersBarChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyEmpCount, setMonthlyEmpCount] = useState([]);
  const [monthlyJobseekerCount, setMonthlyJobseekerCount] = useState([]);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveUsers("employer");
    retrieveUsers("jobseeker");
  }, []);

  const retrieveUsers = async (userRole) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getMonthlyUsers/${userRole}`
      );
      if (response.data.success) {
        if (userRole === "employer") {
          setPastMonths(response.data.months);
          setMonthlyEmpCount(response.data.userCount);
        }
        else if (userRole === "jobseeker") {
          setPastMonths(response.data.months);
          setMonthlyJobseekerCount(response.data.userCount);
        }
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "Users chart data could not be retrieved.",
      });
      handleAlert();
    }
  };

  const generateBarChart = (moreData = {}, moreData2 = {}) => {
    return {
      labels: pastMonths,
      datasets: [
        {
          label: "Employers",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          data: monthlyEmpCount,
          ...moreData,
        },
        {
          label: "Jobseekers",
          backgroundColor: Theme.palette.tuftsBlue,
          borderColor: Theme.palette.tuftsBlue,
          borderWidth: 1,
          data: monthlyJobseekerCount,
          ...moreData2,
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
        <Typography>Grow of Customer Base for the Past 8 Months</Typography>
        <Bar data={generateBarChart()} />
      </FloatCard>
    </div>
  );
};

export default UsersBarChart;
