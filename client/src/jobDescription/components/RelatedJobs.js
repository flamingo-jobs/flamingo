import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FloatCard from '../../components/FloatCard';
import BACKEND_URL from '../../Config';
import JobCard from '../../jobs/components/JobCard';
const jwt = require("jsonwebtoken");


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        marginTop: 16,
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

function RelatedJobs(props) {
    const classes = useStyles();

    const [relatedJobs, setRelatedJobs] = useState([]);

    const [savedJobIds, setSavedJobIds] = useState("empty");
    const userId = sessionStorage.getItem("loginId");

    const isSignedIn = sessionStorage.getItem( "userToken" ) ? true : false;

    const token = sessionStorage.getItem("userToken");
    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
          ? jwt.decode(token, { complete: true }).payload.userRole
          : null
    );

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
                // console.log(err);
            }
        }
    };

    const retrieveRelatedJobs = () => {
        let regexExp = props.job.title.replace(" ", "|");
        let params = { $or: [{ title: { $regex: regexExp, $options: "i" } }, { description: { $regex: regexExp, $options: "i" } }] }

        // axios.post(`${BACKEND_URL}/jobs`, { queryParams: params, options: { limit: 3 } }).then(res => {
        //     if (res.data.success) {
        //         if (props.job) {
        //             setRelatedJobs(res.data.existingData.filter((job) => job._id !== props.job._id));
        //         } else {
        //             setRelatedJobs(res.data.existingData);
        //         }
        //     } else {
        //         setRelatedJobs(null)
        //     }
        // })

        axios.post(`${BACKEND_URL}/jobs/related/${props.job.title}`, { options: { limit: 3 } }).then(res => {
            if (res.data.success) {
                if (props.job) {
                    setRelatedJobs(res.data.jobs.filter((job) => job._id !== props.job._id));
                } else {
                    setRelatedJobs(res.data.jobs);
                }
            } else {
                setRelatedJobs(null)
            }
        })
    }

    useEffect(() => {
        retrieveRelatedJobs();
    }, [props])

    useEffect(() => {
        displayRelatedJobs();
    }, [relatedJobs])

    const displayRelatedJobs = () => {
        if (!isSignedIn || 
            (isSignedIn && role === "jobseeker" && relatedJobs && savedJobIds !== "empty") ||
            (isSignedIn && role === "admin" && relatedJobs) || 
            (isSignedIn && role === "employer" && relatedJobs)) {
            return relatedJobs.map(featuredJob => (
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
                    <Typography>No related jobs are found!</Typography>
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
                        <Typography variant="h5" className={classes.title}>Related Jobs</Typography>
                    </FloatCard>
                </Grid>
                {displayRelatedJobs()}
                <Grid item sm={12}>
                    <FloatCard>
                        <Link to={`/jobs?related=${props.job.title}`}>
                            <Button
                                className={classes.link}
                                endIcon={<ArrowForwardRoundedIcon />}
                            >
                                See more related jobs
                            </Button>
                        </Link>
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default RelatedJobs
