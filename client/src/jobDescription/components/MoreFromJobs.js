import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatCard from '../../components/FloatCard';
import JobCard from '../../jobs/components/JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import theme from '../../Theme';
import BACKEND_URL from '../../Config';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        marginTop: 16,
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
        color: theme.palette.tuftsBlue,
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
function MoreFromJobs(props) {
    const classes = useStyles();

    const [moreFromJobs, setMoreFromJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState("empty");
    const userId = sessionStorage.getItem("loginId");
    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const header = jwt.decode(token, { complete: true });

    useEffect(() => {
        retrieveJobseeker();
      }, []);
      
    const retrieveJobseeker = () => {
        if(header?.payload.userRole === "jobseeker"){
            try {
                const response = axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
                if (response.data.success) {
                    setSavedJobIds(response.data.jobseeker.savedJobs);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const retrieveMoreFromJobs = () => {
        axios.get(`${BACKEND_URL}/jobs/filterByOrganization/${props.job.organization.id}`).then(res => {
            if (res.data.success) {
                if (props.job) {
                    setMoreFromJobs(res.data.moreFromJobs.filter((job) => job._id !== props.job._id));
                } else {
                    setMoreFromJobs(res.data.moreFromJobs);
                }
            } else {
                setMoreFromJobs(null)
            }
        })
    }

    useEffect(() => {
        retrieveMoreFromJobs();
    }, [props])

    useEffect(() => {
        displayMoreFromJobs();
    }, [moreFromJobs])

    const displayMoreFromJobs = () => {
        if (moreFromJobs && savedJobIds !== "empty") {
            return moreFromJobs.map(featuredJob => (
                <Grid item sm={12} key={featuredJob._id} className={classes.jobGridCard}>
                    <JobCard 
                        info={featuredJob} 
                        savedJobIds={savedJobIds}
                        setSavedJobIds={setSavedJobIds}
                    />
                </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No more jobs from {props.job.organization.name}</Typography>
                </Grid>)
        }
    }

    const isEmpty = (obj) => {
        for (var i in obj) return false;
        return true;
    }

    return (
        <div>
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>More from {props.job.organization.name}</Typography>
                    </FloatCard>
                </Grid>
                {displayMoreFromJobs()}
                <Grid item sm={12}>
                    <FloatCard>
                        <Link to={`/jobs?org=${props.job.organization.name}`}>
                            <Button
                                className={classes.link}
                                endIcon={<ArrowForwardRoundedIcon />}
                            >
                                See all jobs from {props.job.organization.name}
                            </Button>
                        </Link>
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default MoreFromJobs
