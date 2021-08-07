import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import { makeStyles } from "@material-ui/core/styles";

const CategoryPieChart = () => {
  const [categoryNames, setCategoryNames] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);

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
      console.log(err);
    }
  };

  const genPieData = () => {
    return {
      datasets: [
        {
          data: categoryCount,
          backgroundColor: [
            "#6a82fb",
            "#fc5c7d",
            "#45b649",
            "#eeba0b",
            "#f85032",
            "#cb997e",
          ],
          label: "Categories",
        },
      ],
      labels: categoryNames,
    };
  };

  return (
    <div>
      <FloatCard>
        <Typography>Most Popular Job Categories</Typography>
        <Pie data={genPieData()} />
      </FloatCard>
    </div>
  );
};

export default CategoryPieChart;
