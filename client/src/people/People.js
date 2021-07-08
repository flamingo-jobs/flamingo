import React from 'react'
import { colors, makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import PeopleSearchBar from './components/PeopleSearchBar';
import PeopleFilters from './components/PeopleFilters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../Config';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import PeopleCard from './components/PeopleCard';

const useStyles = makeStyles((theme) => ({
    peopleGrid: {
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

function People() {
    const classes = useStyles();

    const [people, setPeople] = useState([]);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState({});
    const [queryParams, setQueryParams] = useState({});

    const [page, setPage] = React.useState(1);

    const changePage = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        retrievePeople();
    }, [queryParams, page])

    useEffect(() => {
        updateQuery();
    }, [filters, search])

    const updateFilters = (filterData) => {
        setFilters(filterData);
    }

    const updateSearch = (searchData) => {

        setSearch(searchData);
    }

    const updateQuery = () => {

        if (Object.keys(filters).length != 0 && Object.keys(search).length != 0) {
            setQueryParams({ $and: [filters, search] });
        } else if (Object.keys(filters).length == 0) {
            setQueryParams(search);
        } else if (Object.keys(search).length == 0) {
            setQueryParams(filters);
        } else {
            setQueryParams({});
        }
    }

    const retrievePeople = () => {
        axios.post(`${BACKEND_URL}/jobseekers/getJobseekerCount`, queryParams).then(res => {
            if (res.data.success) {
                setCount(res.data.jobseekerCount)
            } else {
                setCount(0)
            }
        })

        let start = (page - 1) * 10;
        axios.post(`${BACKEND_URL}/jobseekers/filter`, { queryParams: queryParams, options: { skip: start, limit: 10 } }).then(res => {
            
            if (res.data.success) {
                setPeople(res.data.existingData);
            } else {
                setPeople(null)
            }
        })
    }

    const displayPeople = () => {
        if (people) {
            return people.map(job => (
                <Grid key={job._id} item xs={12} md={12} lg={12} className={classes.gridCard}>
                    <PeopleCard info={job} />
                </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No public profiles found!</Typography>
                </Grid>)
        }
    }

    return (
        <>
            <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} alignItems="flex-start">
                <Grid item sm={12} className={classes.searchGrid}>
                    <PeopleSearchBar onChange={updateSearch} />
                </Grid>
                <Grid item container xs={12} sm={12} md={8} lg={9} spacing={2} direction="row" className={classes.peopleGrid} justify="flex-start" alignItems="flex-start">
                    {displayPeople()}
                    <Grid item sm={12}>
                        <Pagination count={Math.ceil(count / 10)} color="primary" page={page} onChange={changePage} classes={{ ul: classes.pagination}}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3} className={classes.filterGrid}>
                    <PeopleFilters onChange={updateFilters} />
                </Grid>
            </Grid>
        </>
    )
}

export default People
