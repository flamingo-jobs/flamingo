import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { Line, Pie, Doughnut, Bar, Radar, Polar } from "react-chartjs-2";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July"];

const generateBarChart = (pastNMonths, monthlyJobCount) => {
  return {
    labels: pastNMonths,
    datasets: [
      {
        label: "Job Count",
        backgroundColor: Theme.palette.stateBlue,
        borderColor: Theme.palette.stateBlue,
        borderWidth: 1,
        data: monthlyJobCount,
      },
      // {
      //   label: "Dataset 2",
      //   backgroundColor: Theme.palette.stateBlue,
      //   borderColor: Theme.palette.stateBlue,
      //   borderWidth: 1,
      //   data: monthlyJobCount,
      // },
    ],
  };
};

const UsersBarChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyJobCount, setMonthlyJobCount] = useState([]);
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
      console.log(err);
    }
  };

  return (
    <div>
      <FloatCard>
        <Typography>Jobs created in past six months</Typography>
        <Bar data={generateBarChart(pastMonths, monthlyJobCount)} />
      </FloatCard>
    </div>
  );
};

export default UsersBarChart;
