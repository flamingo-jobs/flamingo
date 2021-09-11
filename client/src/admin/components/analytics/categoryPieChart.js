import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Grid, Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import SnackBarAlert from "../../../components/SnackBarAlert";
import Theme from "../../../Theme";

const CategoryPieChart = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveCategories();
  }, []);

  const retrieveCategories = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getCategories`
      );
      if (response.data.success) {
        setCategoryNames(response.data.categories);
        setCategoryCount(response.data.count);
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "Pie chart data could not be retrieved.",
      });
      handleAlert();
    }
  };

  const genPieData = () => {
    return {
      datasets: [
        {
          data: categoryCount,
          backgroundColor: [
            // "#6a82fb",
            // "#fc5c7d",
            // "#45b649",
            // "#eeba0b",
            // "#f85032",
            // "#cb997e",
            "#2980b9",
            "#27ae60",
            "#169e94",
            "#eb6b56",
            "#b05f6d",
            "#34495e",
          ],
          label: "Categories",
        },
      ],
      labels: categoryNames,
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
        <Typography>Most Popular Job Categories</Typography>
        <Grid container spacing={1} justify="center" >
          <Grid item xs={10} md={6} style={{marginBottom: 5}}>
            <Pie data={genPieData()}/>
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
};

export default CategoryPieChart;
