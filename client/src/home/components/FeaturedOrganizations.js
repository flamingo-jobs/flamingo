import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import FloatCard from '../../components/FloatCard';
import Organization from '../../employer/components/Organization';
import { Link } from 'react-router-dom'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import axios from 'axios';
import BACKEND_URL from '../../Config';
import SnackBarAlert from '../../components/SnackBarAlert';
import NoInfo from '../../components/NoInfo';
import Loading from '../../components/Loading';
const jwt = require("jsonwebtoken");


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        maxWidth: 'unset'
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
}))

function FeaturedOrganizations() {
    const classes = useStyles();

    const [alertShow, setAlertShow] = useState(false);
    const [alertData, setAlertData] = useState({ severity: "", msg: "" });

    const [featuredOrgs, setFeaturedOrgs] = useState([]);
    const [favoriteOrgIds, setFavoriteOrgIds] = useState("empty");

    const userId = sessionStorage.getItem("loginId");
    const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
    const token = sessionStorage.getItem("userToken");
    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
            ? jwt.decode(token, { complete: true }).payload.userRole
            : null
    );

    useEffect(() => {
        retrieveFeaturedOrgs()
    }, [])

    const retrieveFeaturedOrgs = () => {
        axios.get(`${BACKEND_URL}/employers/featuredEmployers`).then(res => {
            if (res.data.success) {
                if (res.data.featuredEmployers.length !== 0) {
                    setFeaturedOrgs(res.data.featuredEmployers)
                } else {
                    setFeaturedOrgs("empty");
                }
            } else {
                setFeaturedOrgs("empty")
            }
        })
    }

    const displayAlert = () => {
        return (
            <SnackBarAlert
                open={alertShow}
                onClose={handleAlertClose}
                severity={alertData.severity}
                msg={alertData.msg}
            />
        );
    };

    const handleAlert = () => {
        setAlertShow(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertShow(false);
    };

    useEffect(() => {
        retrieveJobseeker();
    }, []);

    const retrieveJobseeker = async () => {
        if (isSignedIn && userId && role === "jobseeker") {
            try {
                const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
                if (response.data.success) {
                    setFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const displayFeaturedOrgs = () => {
        if (featuredOrgs === "empty") {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <NoInfo message="No featured organizations right now!" />
                    </FloatCard>
                </Grid>)
        } else if (featuredOrgs.length === 0) {
            return (
                <Grid item sm={12} style={{ marginBottom: 16 }}>
                    <FloatCard>
                        <Loading />
                    </FloatCard>
                </Grid>)
        } else {
            if (featuredOrgs && favoriteOrgIds !== "empty") {
                return featuredOrgs.map(featuredOrg => (
                    <Grid item xs={12} lg={6} key={featuredOrg._id}>
                        <Organization info={featuredOrg}
                            favoriteOrgIds={favoriteOrgIds}
                            setFavoriteOrgIds={setFavoriteOrgIds}
                            setAlertData={setAlertData}
                            handleAlert={handleAlert}
                        />
                    </Grid>
                ))
            }
        }
    }

    return (
        <div>
            {displayAlert()}
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Organizations</Typography>
                    </FloatCard>
                </Grid>
                <Grid item container direction="row" spacing={2}>
                    {displayFeaturedOrgs()}
                </Grid>
                {featuredOrgs.length > 0 && featuredOrgs !== "empty" ?
                    <Grid item sm={12}>
                        <FloatCard>
                            <Link to="/organizations">
                                <Button
                                    className={classes.link}
                                    endIcon={<ArrowForwardRoundedIcon />}
                                >
                                    See All
                                </Button>
                            </Link>
                        </FloatCard>
                    </Grid> : null}
            </Grid>
        </div>
    )
}

export default FeaturedOrganizations
