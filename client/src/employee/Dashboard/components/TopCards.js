import React from "react";
import {
  makeStyles,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../../components/FloatCard";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "unset"
  },
  cardTitle:{
    fontWeight: "bolder",
    fontSize: 15,
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  },
  cardNumber:{
    fontWeight: "bolder",
    fontSize: 40,
    color: theme.palette.stateBlue,
    float: "center",
  },
  pieChart:{
    width:90,
    height:90,
    padding: '0 0 0 0',
    marginTop: -190,
    marginBottom: -200,
    marginLeft: 65,
  },
  applicationCard:{
    paddingBottom:20,
  },
  applicationsTitle:{
    fontWeight: "bolder",
    fontSize: 15,
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  },
  applicationsNumber:{
    fontWeight: "bolder",
    fontSize: 51,
    color: theme.palette.stateBlue,
    float: "center",
  },

}));

function TopCards(props){
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState('');
    const [appliedJobs,setAppliedJobs] = useState(0);
    let pending = 0;
    let shortlisted = 0;
    let rejected = 0;

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

    function fetchData(){
      let courseData;
      axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
      .then(res => {
        if(res.data.success){
          if(res.data.jobseeker.applicationDetails.length > 0){
            courseData = res.data.jobseeker.applicationDetails;
            if(Object.keys(res.data.jobseeker.applicationDetails[0]).length === 0){
              res.data.jobseeker.applicationDetails.splice(0,1)
            }
          }
          setAppliedJobs(courseData)
        }
      })
      setFetchedData(0)
    }

  function getTotal(){
    let totalPending = 0;
    let totalShortlisted = 0;
    let totalRejected = 0;
    let temp = appliedJobs.length;

    for (let index = 0; index < temp; index++) {
      if(appliedJobs[index].status==="pending"){
        totalPending++
      }else if(appliedJobs[index].status==="shortlisted"){
        totalShortlisted++
      }else if(appliedJobs[index].status==="rejected"){
        totalRejected++
      }
    }

    pending = totalPending;
    shortlisted = totalShortlisted;
    rejected = totalRejected;
    
  }

  useEffect(()=>{
    fetchData();
  },[fetchedData])

    return (
    <Grid container direction="row" xs={12} spacing={2} className={classes.root}>

        <Grid item xs={3}>
            <FloatCard className={classes.applicationCard}>
                        <Typography variant="body2" className={classes.applicationsTitle}>
                            APPLIED
                        </Typography>
                        
                        <Typography variant="h5" className={classes.applicationsNumber} style={{float:"center"}}>                       
                            {appliedJobs.length}
                        </Typography>   
            </FloatCard>
        </Grid>

        <Grid item xs={3}>
            <FloatCard className={classes.applicationCard}>
                        <Typography variant="body2" className={classes.applicationsTitle}>
                            SHORTLISTED
                        </Typography>
                        
                        <Typography variant="h5" className={classes.applicationsNumber} style={{float:"center"}}>
                            {getTotal()}
                            {shortlisted}
                        </Typography>   
            </FloatCard>
        </Grid>

        <Grid item xs={3}>
            <FloatCard className={classes.applicationCard}>
                        <Typography variant="body2" className={classes.applicationsTitle}>
                            PENDING
                        </Typography>
                        
                        <Typography variant="h5" className={classes.applicationsNumber} style={{float:"center"}}>
                            {pending}
                        </Typography>   
            </FloatCard>
        </Grid>

        <Grid item xs={3}>
            <FloatCard className={classes.applicationCard}>
                        <Typography variant="body2" className={classes.applicationsTitle}>
                            REJECTED
                        </Typography>
                        
                        <Typography variant="h5" className={classes.applicationsNumber} style={{float:"center"}}>
                            {rejected}
                        </Typography>   
            </FloatCard>
        </Grid>    
      
    </Grid>
  );
}

export default TopCards;
