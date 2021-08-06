import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import FloatCard from '../../components/FloatCard';
import Organization from '../../employer/components/Organization';
import { Link } from 'react-router-dom'
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import axios from 'axios';
import BACKEND_URL from '../../Config';


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

    const [featuredOrgs, setFeaturedOrgs] = useState([]);

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

    const displayFeaturedOrgs = () => {
        if (featuredOrgs) {

            return featuredOrgs.map(featuredOrg => (
                <Grid item xs={12} lg={6} key={featuredOrg._id}>
                    <Organization info={featuredOrg} />
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
        <div>
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Organizations</Typography>
                    </FloatCard>
                </Grid>
                <Grid item container direction="row" spacing={2}>
                    {displayFeaturedOrgs()}
                </Grid>
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
                </Grid>
            </Grid>
        </div>
    )
}

export default FeaturedOrganizations
