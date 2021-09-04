import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../components/FloatCard';
import Loading from '../components/Loading';
import NoInfo from '../components/NoInfo';
import BACKEND_URL from '../Config';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';
import JobSearchBar from './components/JobSearchBar';

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
        display: "grid",
        marginBottom: 12
    }

}));

function Jobs(props) {
    const classes = useStyles();

    const urlQuery = new URLSearchParams(window.location.search);
    const featured = urlQuery.get('featured');
    const org = urlQuery.get('org');
    const relatedJob = urlQuery.get('related');

    const userId = sessionStorage.getItem("loginId");
    const [savedJobIds, setSavedJobIds] = useState("empty");

    const [jobs, setJobs] = useState([]);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState({});
    const [queryParams, setQueryParams] = useState({ isPublished: true });

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
        // console.log(jobs.length)
        displayJobs();
    }, [jobs]);

    useEffect(() => {
        setJobs([]);
        retrieveJobs();
    }, [queryParams, page]);

    useEffect(() => {
        updateQuery();
    }, [filters, search]);

    useEffect(() => {
        retrieveJobseeker();
        if (relatedJob) {
            let regexExp = relatedJob.replace("%20", "|");
            setSearch({
                $text: { $search: relatedJob }
            })
        }
    }, []);

    const updateFilters = (filterData) => {
        setFilters(filterData);
    }

    const updateSearch = (searchData) => {

        setSearch(searchData);
    }

    const updateQuery = () => {

        if (Object.keys(filters).length !== 0 && Object.keys(search).length !== 0) {
            setQueryParams({ $and: [filters, search, { isPublished: true }] });
        } else if (Object.keys(filters).length === 0) {
            setQueryParams({ $and: [search, { isPublished: true }] });
        } else if (Object.keys(search).length === 0) {
            setQueryParams({$and: [filters, { isPublished: true }]});
        } else if (featured) {
            setQueryParams({ $and: [{ isFeatured: true }, { isPublished: true }] });
        } else {
            setQueryParams({ isPublished: true });
        }
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const retrieveJobs = async () => {
        if ((featured && JSON.stringify(queryParams) === '{"isPublished":true}') || (org && JSON.stringify(queryParams) === '{"isPublished":true}')) {
            return;
        }
        axios.post(`${BACKEND_URL}/jobs/getJobCount`, { queryParams: queryParams, related: relatedJob }).then(res => {
            if (res.data.success) {
                setCount(res.data.jobCount)
            } else {
                setCount(0)
            }

            let start = (page - 1) * 10;
            axios.post(`${BACKEND_URL}/jobs`, { queryParams: queryParams, related: relatedJob, options: { skip: start, limit: 10 } }).then(res => {
                if (res.data.success) {
                    if (res.data.existingData.length !== 0) {
                        setJobs(res.data.existingData);
                    } else {
                        setJobs("empty");
                    }

                } else {
                    setJobs(null)
                }
            })
        })

    }

    const retrieveJobseeker = async () => {
        if (userId) {
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


    const displayJobs = () => {
        // await delay(3000);
        if (jobs === "empty") {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="Sorry, we can't find any job that matches with your requirements. Keep in touch with us" />
                    </FloatCard>
                </Grid>)
        } else if (jobs.length === 0) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <Loading />
                    </FloatCard>
                </Grid>)
        } else {
            return jobs.map(job => (
                <Grid item key={job._id} xs={12} className={classes.gridCard}>
                    <JobCard
                        userId={userId}
                        info={job}
                        userRole={props.userRole}
                        savedJobIds={savedJobIds}
                        setSavedJobIds={setSavedJobIds}
                    />
                </Grid>
            ))
        }
    }

    return (
        <>
            <Grid item container xs={12} spacing={3} direction="row"
                justify="space-between"
                alignItems="flex-start" className={classes.mainGrid}>
                <Grid item xs={12} className={classes.searchGrid}>
                    <JobSearchBar onChange={updateSearch} />
                </Grid>
                <Grid item container xs={12} md={8} lg={9} spacing={0} direction="row"
                    justify="space-between"
                    alignItems="flex-start" className={classes.jobsGrid}>
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

export default Jobs
