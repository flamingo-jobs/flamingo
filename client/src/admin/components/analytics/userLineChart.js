import React, { useState, useEffect } from "react";
import { Line, Pie, Doughnut, Bar, Radar, Polar } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July"];

const UsersLineChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyEmpCount, setMonthlyEmpCount] = useState([]);
  const [monthlyJobseekerCount, setMonthlyJobseekerCount] = useState([]);

  useEffect(() => {
    retrieveUsers("employer");
    // retrieveUsers("jobseeker");
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
      console.log(err);
    }
  };

  const generateLineChart = (moreData = {}, moreData2 = {}) => {
    return {
      labels: pastMonths,
      datasets: [
        {
          label: "Employers",
          backgroundColor: Theme.palette.tuftsBlue,
          borderColor: Theme.palette.tuftsBlue,
          borderWidth: 1,
          data: monthlyEmpCount,
          ...moreData,
        },
        {
          label: "Jobseekers",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          data: monthlyEmpCount,
          ...moreData2,
        },
      ],
    };
  };

  return (
    <div>
      <FloatCard>
        <Typography>Grow of Customer Base</Typography>
        <Line data={generateLineChart({ fill: false }, { fill: false })} />
      </FloatCard>
    </div>
  );
};

export default UsersLineChart;
