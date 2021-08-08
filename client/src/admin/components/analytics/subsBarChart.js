import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const SubsBarChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyBasic, setMonthlyBasic] = useState([]);
  const [monthlyStandard, setMonthlyStandard] = useState([]);
  const [monthlyPremium, setMonthlyPremium] = useState([]);

  useEffect(() => {
    retrieveSubscriptions();
  }, []);

  const retrieveSubscriptions = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getMonthlySubs`
      );
      if (response.data.success) {
        setPastMonths(response.data.months);
        setMonthlyBasic(response.data.basic);
        setMonthlyStandard(response.data.standard);
        setMonthlyPremium(response.data.premium);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const generateBarChart = (moreData = {}, moreData2 = {}) => {
    return {
      labels: pastMonths,
      datasets: [
        {
          label: "Basic",
          backgroundColor: Theme.palette.tuftsBlue,
          borderColor: Theme.palette.tuftsBlue,
          borderWidth: 1,
          data: monthlyBasic,
          ...moreData,
        },
        {
          label: "Standard",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          data: monthlyStandard,
          ...moreData2,
        },
        {
          label: "Premium",
          backgroundColor: Theme.palette.frenchViolet,
          borderColor: Theme.palette.frenchViolet,
          borderWidth: 1,
          data: monthlyPremium,
          ...moreData2,
        },
      ],
    };
  };

  return (
    <div>
      <FloatCard>
        <Typography>Monthly Subscriptions</Typography>
        <Bar data={generateBarChart()} />
      </FloatCard>
    </div>
  );
};

export default SubsBarChart;
