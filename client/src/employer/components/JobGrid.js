import React from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import JobSearchBar from '../../jobs/components/JobSearchBar';
import JobCard from './DetailedJobCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../../Config';
import Pagination from '@material-ui/lab/Pagination';
import FloatCard from '../../components/FloatCard';
import NoInfo from '../../components/NoInfo';
import Loading from '../../components/Loading';
import JobFiltersForEmployer from '../../jobs/components/JobFiltersForEmployer';
const jwt = require("jsonwebtoken");
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

function JobGrid(props) {
    const classes = useStyles();

    const urlQuery = new URLSearchParams(window.location.search);
    const featured = urlQuery.get('featured');
    const org = urlQuery.get('org');
    const relatedJob = urlQuery.get('related');

    const [savedJobIds, setSavedJobIds] = useState("empty");

    const [jobs, setJobs] = useState([]);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState({});
    const [queryParams, setQueryParams] = useState({});

    const [page, setPage] = React.useState(1);

    // Login modal 
    const [open, setOpen] = useState(false);

    const loginId = sessionStorage.getItem("loginId");
    const userId = jwt.decode(sessionStorage.getItem("userToken"), {
        complete: true,
    }).payload.userId;


    const generateQuery = () => {
        return props.singleJobAccess
            ? { 'organization.id': loginId, "createdBy": userId }
            : { 'organization.id': loginId }
    };

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
        props.unsetRefresh();
    }, [queryParams, page, props.refreshRequired]);

    useEffect(() => {
        updateQuery();
    }, [filters, search]);

    const updateFilters = (filterData) => {
        setFilters(filterData);
    }

    const updateSearch = (searchData) => {

        setSearch(searchData);
    }

    const updateQuery = () => {

        if (Object.keys(filters).length !== 0 && Object.keys(search).length !== 0) {
            setQueryParams({ $and: [filters, search, generateQuery()] });
        } else if (Object.keys(filters).length === 0) {
            setQueryParams({ $and: [search, generateQuery()] });
        } else if (Object.keys(search).length === 0) {
            setQueryParams({ $and: [filters, generateQuery()] });
        } else if (featured) {
            setQueryParams({ $and: [{ isFeatured: true }, generateQuery()] });
        } else {
            setQueryParams(generateQuery());
        }
    }

    const getPending = (row) => {
        var pending = 0;

        row.applicationDetails.forEach((element) => {
            if (element.status == "pending") {
                pending++;
            }
            console.log(element.status);
        });

        return pending;
    };

    const getReviewing = (row) => {
        var reviewing = 0;

        row.applicationDetails.forEach((element) => {
            if (element.status == "reviewing") {
                reviewing++;
            }
            console.log(element.status);
        });

        return reviewing;
    };

    const getShortlisted = (row) => {
        var shortlisted = 0;

        row.applicationDetails.forEach((element) => {
            if (element.status == "shortlisted") {
                shortlisted++;
            }
            console.log(element.status);
        });

        return shortlisted;
    };

    const getRejected = (row) => {
        var rejected = 0;

        row.applicationDetails.forEach((element) => {
            if (element.status == "rejected") {
                rejected++;
            }
            console.log(element.status);
        });

        return rejected;
    };

    const getMerged = (row) => {
        let mergedArray = [];
        let pending = getPending(row);
        let reviewing = getReviewing(row);
        let shortlisted = getShortlisted(row);
        let rejected = getRejected(row);

        if (pending) {
            mergedArray.push({
                label: "Pending",
                value: pending,
                color: "#ffce63"
            })
        }

        if (reviewing) {
            mergedArray.push({
                label: "Reviewing",
                value: reviewing,
                color: "#eb78ff"
            })
        }

        if (shortlisted) {
            mergedArray.push({
                label: "Shortlisted",
                value: shortlisted,
                color: "#52ff52"
            })
        }

        if (rejected) {
            mergedArray.push({
                label: "Rejected",
                value: rejected,
                color: "#f52560"
            })
        }

        return mergedArray;
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const retrieveJobs = async () => {
        if (JSON.stringify(queryParams) === "{}") {
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

    const displayJobs = () => {
        // await delay(3000);
        if (jobs === "empty") {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="Sorry, we can't find any job that matches with your requirements." />
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
                        values={getMerged(job)}
                    />
                </Grid>
            ))
        }
    }

    return (
        <>
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
                    <JobFiltersForEmployer onChange={updateFilters} />
                </Grid>
            </Grid>
        </>
    )
}

export default JobGrid
