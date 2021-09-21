import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { Line } from "react-chartjs-2";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import SnackBarAlert from "../../../components/SnackBarAlert";

const RevenueLineChart = () => {
  const [pastMonths, setPastMonths] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveRevenue();
  }, []);

  const retrieveRevenue = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getMonthlyRevenue`
      );
      if (response.data.success) {
        setPastMonths(response.data.months);
        setMonthlyRevenue(response.data.revenue);
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "Revenue chart data could not be retrieved.",
      });
      handleAlert();
    }
  };

  const generateLineChart = (moreData = {}) => {
    return {
      labels: pastMonths,
      datasets: [
        {
          label: "Revenue",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          tension: 0.4,
          data: monthlyRevenue,
          ...moreData,
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
        <Typography>Revenue for the Past 8 Months in LKR</Typography>
        <Line data={generateLineChart({ fill: true })} options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }} />
      </FloatCard>
    </div>
  );
};

export default RevenueLineChart;
