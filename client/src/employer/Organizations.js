import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../components/FloatCard';
import Loading from '../components/Loading';
import NoInfo from '../components/NoInfo';
import BACKEND_URL from '../Config';
import LoginModal from './components/loginModal';
import OrganizationCard from './components/OrganizationCard';
import OrganizationFilters from './components/OrganizationFilters';
import OrgSearchBar from './components/OrgSearchBar';
import { useSelector, useDispatch } from "react-redux";
import { setReduxFavoriteOrgIds } from "../redux/actions";

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

function Organizations(props) {
    const classes = useStyles();

    // Redux
    const reduxFavoriteOrgIds = useSelector(state => state.favoriteOrgIds);
    const dispatch = useDispatch();

    const jwt = require("jsonwebtoken");
    const token = sessionStorage.getItem("userToken");
    const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
            ? jwt.decode(token, { complete: true }).payload.userRole
            : null
    );

    const userId = sessionStorage.getItem("loginId");
    const [favoriteOrgIds, setFavoriteOrgIds] = useState("empty");

    const [organizations, setOrganizations] = useState([]);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState({});
    const [search, setSearch] = useState({});
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
        retrieveOrganizations();
    }, [queryParams, page])

    useEffect(() => {
        updateQuery();
    }, [filters, search])

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
            setQueryParams({ $and: [filters, search] });
        } else if (Object.keys(filters).length === 0) {
            setQueryParams(search);
        } else if (Object.keys(search).length === 0) {
            setQueryParams(filters);
        } else {
            setQueryParams({});
        }
    }

    const retrieveOrganizations = () => {
        axios.post(`${BACKEND_URL}/employers/getEmployerCount`, queryParams).then(res => {
            if (res.data.success) {
                setCount(res.data.employerCount)
            } else {
                setCount(0)
            }
        })

        let start = (page - 1) * 10;
        axios.post(`${BACKEND_URL}/employers/filter`, { queryParams: queryParams, options: { skip: start, limit: 10 } }).then(res => {

            if (res.data.success) {
                if (res.data.existingData.length !== 0) {
                    setOrganizations(res.data.existingData);
                } else {
                    setOrganizations("empty");
                }
            } else {
                setOrganizations(null)
            }
        })
    }

    const retrieveJobseeker = async () => {
        if (isSignedIn && role === "jobseeker" && reduxFavoriteOrgIds === "empty") {
            try {
                const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
                if (response.data.success) {
                    setFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations);
                    dispatch(setReduxFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations));
                }
            } catch (err) {
                // console.log(err);
            }
        } else {
            setFavoriteOrgIds(reduxFavoriteOrgIds);
        }
    };

    const displayOrganizations = () => {
        if (organizations === "empty") {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="Sorry, we can't find any organizations that matches with your requirements. Keep in touch with us" />
                    </FloatCard>
                </Grid>)
        } else if (organizations.length === 0) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <Loading />
                    </FloatCard>
                </Grid>)
        } else if (organizations) {
            return organizations.map(org => (
                <Grid item xs={12} md={12} key={org._id} className={classes.gridCard}>
                    <OrganizationCard
                        userId={userId}
                        info={org}
                        userRole={props.userRole}
                        favoriteOrgIds={favoriteOrgIds}
                        setFavoriteOrgIds={setFavoriteOrgIds}
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
            <Grid item container xs={12} spacing={3} direction="row"
                justify="space-between"
                alignItems="flex-start" className={classes.mainGrid}>
                <Grid item xs={12} className={classes.searchGrid}>
                    <OrgSearchBar onChange={updateSearch} />
                </Grid>
                <Grid item container xs={12} md={8} lg={9} spacing={0} direction="row"
                    justify="space-between"
                    alignItems="flex-start" className={classes.jobsGrid}>
                    {displayOrganizations()}
                    <Grid item sm={12}>
                        {organizations !== "empty" ?
                            <Pagination count={Math.ceil(count / 10)} color="primary" page={page} onChange={changePage} classes={{ ul: classes.pagination }} />
                            : null
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3} className={classes.filterGrid}>
                    <OrganizationFilters onChange={updateFilters} />
                </Grid>
            </Grid>
        </>
    )
}

export default Organizations
