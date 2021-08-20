import React from 'react'
import { colors, makeStyles, CircularProgress, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import JobSearchBar from './components/JobSearchBar';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../Config';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import LoginModal from './components/loginModal';
import FloatCard from '../components/FloatCard';
import NoInfo from '../components/NoInfo';
import Loading from '../components/Loading';

const useStyles = makeStyles((theme) => ({
    jobsGrid: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
            flexDirection: 'column',
            alignItems: "stretch",
            order: 3
        },
    },
    mainGrid: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: "stretch"
        },
        [theme.breakpoints.down('xs')]: {
            paddingRight: 12,
            paddingLeft: 12
        },
    },
    filterGrid: {
        [theme.breakpoints.down('sm')]: {
            order: 2
        },
    },
    searchGrid: {
        [theme.breakpoints.down('sm')]: {
            order: 1
        },
    },
    pagination: {
        justifyContent: 'center',
    },
    gridCard: {
        display: "grid"
    }

}));

function Recommendations(props) {
    const classes = useStyles();

    const urlQuery = new URLSearchParams(window.location.search);
    const featured = urlQuery.get('featured');
    const org = urlQuery.get('org');

    const userId = sessionStorage.getItem("loginId");
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
        if (userId) {
            try {
                const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
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
        <>
            {/* Works only when user is not signed in */}
            <LoginModal
                open={open}
                handleClose={handleClose}
            ></LoginModal>

            <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} alignItems="flex-start">
                <Grid item sm={12} className={classes.searchGrid}>
                    <JobSearchBar onChange={updateSearch} />
                </Grid>
                <Grid item container xs={12} sm={12} md={8} lg={9} spacing={2} direction="row" className={classes.jobsGrid} justify="flex-start" alignItems="flex-start">
                    {displayJobs()}
                    <Grid item sm={12}>
                        {jobs !== "empty" ?
                            <Pagination count={Math.ceil(count / 10)} color="primary" page={page} onChange={changePage} classes={{ ul: classes.pagination }} />
                            : null
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3} className={classes.filterGrid}>
                    <JobFilters onChange={updateFilters} />
                </Grid>
            </Grid>
        </>
    )
}

export default Recommendations
