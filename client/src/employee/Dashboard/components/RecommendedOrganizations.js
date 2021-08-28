import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import FloatCard from '../../../components/FloatCard';
import Organization from '../../../employer/components/Organization';

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import axios from 'axios';
import BACKEND_URL from '../../../Config';
const jwt = require("jsonwebtoken");


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: "#8e24aa",
        paddingTop: "17px",
        fontSize: "28px"
    },
    container: {
        maxWidth: 'unset'
    },
    link: {
        backgroundColor: theme.palette.white,
        color: "#8e24aa",
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

function RecommendedOrganizations(props) {
    const classes = useStyles();
    const [favoriteOrgs, setFavoriteOrgs] = useState("empty");
    
    const [featuredOrgs, setFeaturedOrgs] = useState([]);
    
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
                setFeaturedOrgs(res.data.featuredEmployers)
            } else {
                setFeaturedOrgs(null)
            }
        })
    }

    useEffect(() => {
        retrieveJobseeker();
    }, []);

    const retrieveJobseeker = async () => {
        if(isSignedIn && userId && role === "jobseeker"){
            try {
              const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
              if (response.data.success) {
                setFavoriteOrgs(response.data.jobseeker.favoriteOrganizations);
              }
            } catch (err) {
              console.log(err);
            }
        }
    };

    const displayFeaturedOrgs = () => {
        if (featuredOrgs && favoriteOrgs !== "empty") {
            
            return featuredOrgs.map(featuredOrg => (
                <Grid item xs={12} lg={6} key={featuredOrg._id}>
                        <Organization 
                            info={featuredOrg}
                            favoriteOrgs={favoriteOrgs}
                            setFavoriteOrgs={setFavoriteOrgs}
                        />
                    </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No featured Organizations</Typography>
                </Grid>)
        }
    }

    return (
        <FloatCard backColor="#f7e6ff">
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <Typography variant="h5" className={classes.title}>Suggested Organizations</Typography>
                </Grid>
                <Grid item container direction="row" spacing={2}>
                    {displayFeaturedOrgs()}
                </Grid>
                <Grid item sm={12}>
                    <FloatCard>
                        <Button
                            className={classes.link}
                            endIcon={<ArrowForwardRoundedIcon />}
                        >
                            See All
      </Button>
                    </FloatCard>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default RecommendedOrganizations
