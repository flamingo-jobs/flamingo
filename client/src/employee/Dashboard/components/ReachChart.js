import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import { Line } from "react-chartjs-2";
import Theme from "../../../Theme";
import axios from "axios";
import BACKEND_URL from "../../../Config";

const ReachChart = (props) => {

  const [reach, setReach] = useState([]);
  const [counts, setCounts] = useState([]);
  

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if(token === null){
    loginId=props.jobseekerID;
  }else if (header.payload.userRole === "jobseeker") {
    login = true;
    loginId=sessionStorage.getItem("loginId");
  } else {
    loginId=props.jobseekerID;
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getCount();
  }, [reach]);


  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.reach.length > 0){
            setReach(res.data.jobseeker.reach)
        }
      }
    })
  }

  function getCount(){
    let monthlyReach = [0,0,0,0,0,0,0,0,0,0,0,0];
    for (let index = 0; index < reach?.length; index++) {
        let dt = reach[index].date;
        let temp = dt.split("/");
        monthlyReach[temp[1]-1]++;
    }
    setCounts(monthlyReach);
    console.log(counts);
  }

  const generateLineChart = () => {
    return {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          label: "No. of visitors",
          backgroundColor: Theme.palette.stateBlue,
          borderColor: Theme.palette.stateBlue,
          borderWidth: 1,
          data: counts,
        },
      ],
    };
  };

  return (
    <div>
      <FloatCard>
        <Typography>Monthly Profile Reach</Typography>
        <Line data={generateLineChart({fill: false})} />
      </FloatCard>
    </div>
  );
};

export default ReachChart;
