import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { Bar } from "react-chartjs-2";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const ResumeBarChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyResumeCount, setMonthlyResumeCount] = useState([]);
  
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
        console.log("pastMonths", response.data.months);
        console.log("monthlyResumeCount", response.data.resumeCount);
      }
    } catch (err) {
      console.log(err);
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

  return (
    <div>
      <FloatCard>
        <Typography>Number of Resumes in Each Month</Typography>
        <Bar data={generateBarChart()} />
      </FloatCard>
    </div>
  );
};

export default ResumeBarChart;
