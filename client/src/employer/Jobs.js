import { Button, Grid, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import JobGrid from './components/JobGrid'
import NoAccess from "../components/NoAccess";
import FloatCard from '../components/FloatCard';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import { Link } from 'react-router-dom';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AddIcon from "@material-ui/icons/Add";
import JobTable from './components/JobTable';
const jwt = require("jsonwebtoken");
const useStyles = makeStyles((theme) => ({
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
    addButton: {
        padding: '12px 16px 12px 16px',
        borderRadius: 10,
        backgroundColor: theme.palette.tuftsBlue,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.tuftsBlueHover,
        },
        fontWeight: 700

    },
    toggleGroup: {
    },
    toggleButton: {
        color: "#578fbd",
        border: 'none',
        "&:hover": {
            backgroundColor: theme.palette.lightSkyBlueHover,
        },
        "&.Mui-selected:hover": {
            backgroundColor: theme.palette.lightSkyBlueHover,
        },
        "&.Mui-selected": {
            color: "#005ba6",
            background: theme.palette.white
        },
    },
    refreshBtn: {
        padding: '12px 16px 12px 16px',
        borderRadius: 10,
        marginLeft: 16,
        backgroundColor: theme.palette.white,
        color: theme.palette.tuftsBlue,
        "&:hover": {
            backgroundColor: theme.palette.lightSkyBlueHover,
        },
        fontWeight: 700
    },
}))

function Jobs() {
    const classes = useStyles();

    const [isGrid, setIsGrid] = useState(true);
    const [refreshRequired, setRefreshRequired] = useState(false);


    let jobAccess = false;
    let singleJobAccess = false;

    const handleChange = (event, nextView) => {
        setIsGrid(nextView);
    };

    const handleRefresh = () => {

        setRefreshRequired(true);
    };

    const unsetRefresh = () => {

        setRefreshRequired(false);
    };

    if (sessionStorage.getItem("userToken")) {
        var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
            complete: true,
        }).payload.accessTokens;
        if (accessTokens.includes("all") || accessTokens.includes("alljobs")) {
            jobAccess = true;
        } else if (accessTokens.includes("singlejob")) {
            singleJobAccess = true;
        }
    }

    return (
        <>
            {jobAccess || singleJobAccess ? (
                <>
                    <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} alignItems="flex-start">
                        <Grid item xs={6} style={{ textAlign: 'left', marginBottom: 24 }}>
                            <Link to="/employer/jobs/create">
                                <Button
                                    className={classes.addButton}
                                    startIcon={<AddIcon />}
                                // onClick={handleClick}
                                >
                                    Add new job
                                </Button>
                            </Link>
                            <Button className={classes.refreshBtn} onClick={handleRefresh}>
                                <RefreshRoundedIcon /> Refresh
                            </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'right', marginBottom: 24 }}>

                            <ToggleButtonGroup orientation="horizontal" value={isGrid} className={classes.toggleGroup} exclusive onChange={handleChange}>
                                <ToggleButton value={true} aria-label="grid" className={classes.toggleButton}>
                                    <ViewQuiltIcon />
                                </ToggleButton>
                                <ToggleButton value={false} aria-label="list" className={classes.toggleButton}>
                                    <ViewListIcon />
                                </ToggleButton>

                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                    {isGrid ? <JobGrid refreshRequired={refreshRequired} unsetRefresh={unsetRefresh} singleJobAccess={singleJobAccess}/> : <JobTable singleJobAccess={singleJobAccess} refreshRequired={refreshRequired} unsetRefresh={unsetRefresh}/>}
                </>
            ) : (
                <NoAccess />
            )}


        </>
    )
}

export default Jobs
