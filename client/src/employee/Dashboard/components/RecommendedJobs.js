import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatCard from '../../../components/FloatCard';
import JobCard from '../../../jobs/components/JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import BACKEND_URL from '../../../Config';
import NoInfo from '../../../components/NoInfo';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';


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
function RecommendedJobs(props) {
    const classes = useStyles();

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

    const urlQuery = new URLSearchParams(window.location.search);
    const featured = urlQuery.get('featured');
    const org = urlQuery.get('org');

    const [savedJobIds, setSavedJobIds] = useState("empty");

    const [jobs, setJobs] = useState([]);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState({});
    const [recommendedIds, setRecommendedIds] = useState([]);
    const [queryParams, setQueryParams] = useState({});

    const [page, setPage] = React.useState(1);

    // Login modal 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const changePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        console.log(jobs.length)
        displayJobs();
    }, [jobs]);

    useEffect(() => {
        retrieveJobs();
    }, [queryParams, page, recommendedIds]);

    useEffect(() => {
        updateQuery();
    }, [filters, search, recommendedIds]);

    useEffect(() => {
        retrieveJobseeker();
    }, []);

    const updateFilters = (filterData) => {
        setFilters(filterData);
    }

    const updateSearch = (searchData) => {

        setSearch(searchData);
    }

    const updateQuery = () => {

        if (Object.keys(filters).length !== 0 && Object.keys(search).length !== 0) {
            setQueryParams({ $and: [{ $and: [filters, search] }, { "_id": { $in: recommendedIds } }] });
        } else if (Object.keys(filters).length === 0) {
            setQueryParams({ $and: [search, { "_id": { $in: recommendedIds } }] });
        } else if (Object.keys(search).length === 0) {
            setQueryParams({ $and: [filters, { "_id": { $in: recommendedIds } }] });
        } else if (featured) {
            setQueryParams({ $and: [{ isFeatured: true }, { "_id": { $in: recommendedIds } }] });
        } else {
            setQueryParams({ "_id": { $in: recommendedIds } });
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const retrieveJobs = async () => {
        if (recommendedIds === "empty") {
            setJobs("empty");
            return;
        }
        if (JSON.stringify(queryParams) === "{}" || JSON.stringify(queryParams) === `{"$and":[{},{"_id":{"$in":[]}}]}`) {
            return;
        }
        axios.post(`${BACKEND_URL}/jobs/getJobCount`, { queryParams: queryParams }).then(res => {
            if (res.data.success) {
                setCount(res.data.jobCount)
            } else {
                setCount(0)
            }

            let start = (page - 1) * 10;
            axios.post(`${BACKEND_URL}/jobs/recommended`, { queryParams: queryParams, options: { skip: start, limit: 10 } }).then(res => {
                if (res.data.success) {
                    setJobs(res.data.existingData.sort(sortJobsBasedOnScore))
                } else {
                    setJobs(null)
                }
            })
        })

    }


    function sortJobsBasedOnScore(a, b) {
        return recommendedIds.indexOf(a._id) - recommendedIds.indexOf(b._id);
    }

    const retrieveJobseeker = async () => {
        if (loginId) {
            try {
                const response = await axios.get(`${BACKEND_URL}/jobseeker/${loginId}`);
                if (response.data.success) {
                    setSavedJobIds(response.data.jobseeker.savedJobs);
                    if (response.data.jobseeker.recommendedJobs.length !== 0) {
                        setRecommendedIds(response.data.jobseeker.recommendedJobs.sort(({ score: a }, { score: b }) => b - a).map(job => job.id));
                    } else {
                        setRecommendedIds("empty");
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const displayJobs = () => {
        // await delay(3000);
        if (jobs === "empty" ) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="Sorry, we don't have suggestions for you right now. Complete your profile to get suggested jobs." />
                    </FloatCard>
                </Grid>)
        } else if (jobs.length === 0) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <Loading />
                    </FloatCard>
                </Grid>)
        } else if(savedJobIds !== "empty"){
            return jobs.map(job => (
                <Grid item key={job._id} xs={12} className={classes.gridCard}>
                    <JobCard
                        info={job}
                        savedJobIds={savedJobIds}
                        setSavedJobIds={setSavedJobIds}
                        handleOpen={handleOpen}
                    />
                </Grid>
            ))
        }
    }

    return (
            <Grid container xs={12} direction="column" spacing={2} className={classes.container}>
                <Grid item xs={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Suggested Jobs</Typography>
                    </FloatCard>
                </Grid>
                {displayJobs()}
                <Grid item xs={12}>
                  <Link to="/jobseeker/suggestedJobs">
                    <FloatCard>
                        <Button
                            className={classes.link}
                            endIcon={<ArrowForwardRoundedIcon />}
                        >
                            See All
                        </Button>
                    </FloatCard>
                  </Link>
                </Grid>
            </Grid>
    )
}

export default RecommendedJobs
