import React from "react";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Avatar,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
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

const TopCards = (props) => {

  const [value, setValue] = React.useState(2);

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`
      )
      .then((res) => {
        console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs,
          });
        }
      });
  }, []);


  const getTotalApplications = () => {

    var noOfApplications = 0;

    allJobs.forEach(job => {
        noOfApplications = noOfApplications+job.applicationDetails.length;
    }      
    );
    return noOfApplications;
  }

  const getTotalPending = () => {

    var totalPending = 0;

    allJobs.forEach(job => {
      
        job.applicationDetails.forEach(jobApplication => { 
            if(jobApplication.status=="pending"){
                totalPending++
            }
        }   
        );
    }    
    );
    return totalPending;
  }

  const getTotalShortlisted = () => {

    var totalShortlisted = 0;

    allJobs.forEach(job => {
      
        job.applicationDetails.forEach(jobApplication => { 
            if(jobApplication.status=="shortlisted"){
                totalShortlisted++
            }
        }   
        );
    }    
    );
    return totalShortlisted;
  }

  const getTotalRejected = () => {

    var totalRejected = 0;

    allJobs.forEach(job => {
      
        job.applicationDetails.forEach(jobApplication => { 
            if(jobApplication.status=="rejected"){
                totalRejected++
            }
        }   
        );
    }    
    );
    return totalRejected;
  }

    const classes = useStyles();

    return (
    <Grid container direction="row" xs={12} spacing={1} className={classes.root}>

        <Grid item xs={3}>
            <FloatCard className={classes.applicationCard}>
                        <Typography variant="body2" className={classes.applicationsTitle}>
                            APPLICATIONS
                        </Typography>
                        
                        <Typography variant="h5" className={classes.applicationsNumber} style={{float:"center"}}>
                            {getTotalApplications()}
                        </Typography>   
            </FloatCard>
        </Grid>

        <Grid item xs={3}>
            <FloatCard>
                <Grid container direction="row" xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="body2" className={classes.cardTitle}>
                            SHORTLISTED
                        </Typography>
                        <Typography variant="h5" className={classes.cardNumber}>
                            {getTotalShortlisted()}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                  
                        <Chart
                            data={[
                              { category: 'shortlisted', val: getTotalShortlisted() },
                              { category: 'total', val: getTotalApplications() - getTotalShortlisted()},
                            ]}
                            className={classes.pieChart}
                            >
                            <PieSeries
                                valueField="val"
                                argumentField="category"
                                innerRadius={0.6}
                            />
                            <Animation />
                        </Chart>
               
                    </Grid>
                </Grid>
                
            </FloatCard>
        </Grid>

        <Grid item xs={3}>
        <FloatCard>
                <Grid container direction="row" xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="body2" className={classes.cardTitle}>
                            PENDING
                        </Typography>
                        <Typography variant="h5" className={classes.cardNumber}>
                        {getTotalPending()}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                  
                        <Chart
                            data={[
                              { category: 'pending', val: getTotalPending() },
                              { category: 'total', val: getTotalApplications() - getTotalPending()},
                            ]}
                            className={classes.pieChart}
                            >
                            <PieSeries
                                valueField="val"
                                argumentField="category"
                                innerRadius={0.6}
                            />
                            <Animation />
                        </Chart>
               
                    </Grid>
                </Grid>
                
            </FloatCard>
        </Grid>

        <Grid item xs={3}>
        <FloatCard>
                <Grid container direction="row" xs={12} spacing={2}>
                    <Grid item xs={1}>
                        <Typography variant="body2" className={classes.cardTitle}>
                            REJECTED
                        </Typography>
                        <Typography variant="h5" className={classes.cardNumber}>
                            {getTotalRejected()}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                  
                        <Chart
                            data={[
                              { category: 'rejected', val: getTotalRejected() },
                              { category: 'total', val: getTotalApplications() - getTotalRejected()},
                            ]}
                            className={classes.pieChart}
                            >
                            <PieSeries
                                valueField="val"
                                argumentField="category"
                                innerRadius={0.6}
                            />
                            <Animation />
                        </Chart>
               
                    </Grid>
                </Grid>
                
            </FloatCard>
        </Grid>
     
      
    </Grid>
  );
};

export default TopCards;
