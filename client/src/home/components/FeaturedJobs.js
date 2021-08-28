import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatCard from '../../components/FloatCard';
import JobCard from '../../jobs/components/JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import theme from '../../Theme';
import BACKEND_URL from '../../Config';
import { Link } from 'react-router-dom'
import NoInfo from '../../components/NoInfo';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
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
function FeaturedJobs(props) {
    const classes = useStyles();

    const [featuredJobs, setFeaturedJobs] = useState([]);
    const [savedJobIds, setSavedJobIds] = useState("empty");

    const jwt = require("jsonwebtoken");
    const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
    const userId = sessionStorage.getItem("loginId");
    const token = sessionStorage.getItem("userToken");
    const [role, setRole] = useState(
      jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.userRole
      : null
    );

    const retrieveFeaturedJobs = () => {
        axios.get(`${BACKEND_URL}/jobs/featuredJobs`).then(res => {
            if (res.data.success) {
                if (res.data.featuredJobs.length !== 0) {
                    if (props.skip) {
                        setFeaturedJobs(res.data.featuredJobs.filter((job) => job._id !== props.skip));
                    } else {
                        setFeaturedJobs(res.data.featuredJobs);
                    }
                } else {
                    setFeaturedJobs("empty");
                }
            } else {
                setFeaturedJobs("empty")
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
        if (isSignedIn && role === "jobseeker" && userId) {
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
        if (featuredJobs === "empty") {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="No featured jobs right now!" />
                    </FloatCard>
                </Grid>)
        } else if (featuredJobs.length === 0) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <Loading />
                    </FloatCard>
                </Grid>)
        } else {

            return featuredJobs.map(featuredJob => (
                <Grid item sm={12} key={featuredJob._id} className={classes.jobGridCard}>
                    <JobCard
                        userId={userId}
                        userRole={props.userRole}
                        info={featuredJob}
                        savedJobIds={savedJobIds}
                        setSavedJobIds={setSavedJobIds}
                    />
                </Grid>
            ))
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
                        <Typography variant="h5" className={classes.title}>Featured Jobs</Typography>
                    </FloatCard>
                </Grid>
                {displayFeaturedJobs()}
                {featuredJobs.length > 0 && featuredJobs !== "empty" ?
                    <Grid item sm={12}>
                        <FloatCard>
                            <Link to="/jobs?featured=true">
                                <Button
                                    className={classes.link}
                                    endIcon={<ArrowForwardRoundedIcon />}
                                >
                                    See All Featured Jobs
                                </Button>
                            </Link>
                        </FloatCard>
                    </Grid> : null}
                <Grid item sm={12}>
                    <FloatCard backColor={theme.palette.tuftsBlue}>
                        <Grid item container direction="row" sm={12} className={classes.allJobs}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="h6" className={classes.text}>Want to dive into?</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Link to="/jobs">
                                    <Button className={classes.button} endIcon={<ArrowForwardRoundedIcon />}> Browse All Jobs </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default FeaturedJobs
