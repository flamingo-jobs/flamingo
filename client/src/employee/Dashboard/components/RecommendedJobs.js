import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatCard from '../../../components/FloatCard';
import JobCard from '../../../jobs/components/JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import BACKEND_URL from '../../../Config';


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: "#8e24aa",
        paddingTop: "17px",
        fontSize: "28px"
    },
    container: {
        maxWidth: 'unset'
    },
    allJobs: {
        paddingTop: 9,
        paddingBottom: 9
    },
    text: {
        color: theme.palette.white
    },
    button: {
        backgroundColor: theme.palette.white,
        color: theme.palette.tuftsBlue,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.tuftsBlueHover,
            color: 'white',
        },
        [theme.breakpoints.down('md')]: {
            marginTop: 20
        },
    },
    link: {
        backgroundColor: theme.palette.white,
        color: "#8e24aa",
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.white,
            color: theme.palette.tuftsBlueHover,
        }
    },
    jobGridCard: {
        display: "grid"
    }
}))
function RecommendedJobs(props) {
    const classes = useStyles();
    const userId = sessionStorage.getItem("loginId");
    const [savedJobIds, setSavedJobIds] = useState("empty");

    const [featuredJobs, setFeaturedJobs] = useState([]);



    const retrieveFeaturedJobs = () => {
        axios.get(`${BACKEND_URL}/jobs/featuredJobs`).then(res => {
            if (res.data.success) {
                if (props.skip) {
                    setFeaturedJobs(res.data.featuredJobs.filter((job) => job._id !== props.skip));
                } else {
                    setFeaturedJobs(res.data.featuredJobs);
                }
            } else {
                setFeaturedJobs(null)
            }
        })
    }

    useEffect(() => {
        retrieveFeaturedJobs();
    }, [props.skip])

    useEffect(() => {
        retrieveJobseeker();
    }, []);

    const retrieveJobseeker = async () => {
        if(userId){
            try {
              const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
              if (response.data.success) {
                setSavedJobIds(response.data.jobseeker.savedJobs);
              }
            } catch (err) {
              console.log(err);
            }
        }
    };

    const displayFeaturedJobs = () => {
        if (featuredJobs) {

            return featuredJobs.map(featuredJob => (
                <Grid item sm={12} key={featuredJob._id} className={classes.jobGridCard}>
                    <JobCard 
                        info={featuredJob}
                        userId={userId}
                        userRole={props.userRole}
                        savedJobIds={savedJobIds}
                        setSavedJobIds={setSavedJobIds}
                    />
                </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No jobs near your location</Typography>
                </Grid>)
        }
    }

    const isEmpty = (obj) => {
        for (var i in obj) return false;
        return true;
    }

    return (
        <FloatCard backColor="#f7e6ff">
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <Typography className={classes.title}>Recommended Jobs</Typography>
                </Grid>
                {displayFeaturedJobs()}
                <Grid item sm={12}>
                    <FloatCard>
                        <Button
                            className={classes.link}
                            endIcon={<ArrowForwardRoundedIcon />}
                        >
                            See All
                        </Button>
                    </FloatCard>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default RecommendedJobs
