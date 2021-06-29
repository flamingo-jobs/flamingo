import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import FloatCard from '../../components/FloatCard'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import Rating from '@material-ui/lab/Rating';
import BACKEND_URL from '../../Config';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'block',
        alignItems: 'center',
        margin: 10,
        marginTop: 16
    },
    headerLogo: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 15,
    },
    label: {
        alignSelf: 'left',
        marginRight: 15,
        backgroundColor: theme.palette.tagYellow
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    tagIcon: {
        color: theme.palette.tagIcon
    },
    favorite: {
        display: 'block',
        color: theme.palette.pinkyRed,
        minWidth: 36
    },
    body: {
        margin: 10
    },
    title: {
        fontWeight: 500,
    },
    infoTags: {
        margin: 10
    },
    tag: {
        backgroundColor: 'white',
    },

    reviews: {
        alignItems: 'center',
        textAlign: '-webkit-center',

    },
    footer: {
        alignItems: 'center',
        margin: 15
    },
    logo: {
        borderRadius: 12,
        width: 90,
        height: 90
    },
    company: {
        fontWeight: 500
    },
    applyButton: {
        borderRadius: 8,
        backgroundColor: theme.palette.vividSkyBlue,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlueHover,
        }
    },
    favButton: {
        margin: 10,
        borderRadius: 8,
        backgroundColor: theme.palette.lightyPink,
        color: theme.palette.black,
        "&:hover": {
            backgroundColor: theme.palette.lightyPinkHover,
        }
    },
    headerInfo: {
        display: 'block'
    },
    description: {
        fontSize: 13
    }
}))

function CompanySummary(props) {

    const classes = useStyles();

    const [summary, setSummary] = useState("empty");

    const getAvgRating = (arr = []) => {
        return arr.map(item => item.rating).reduce((a, x) => a + x, 0) / arr.length;
    }

    const retrieveOrganizations = () => {
        axios.get(`${BACKEND_URL}/employers/60c246913542f942e4c84454`,).then(res => {
            if (res.data.success) {
                setSummary(res.data.employer)
            } else {
                setSummary("empty")
            }
        })
    }

    useEffect(() => {
        retrieveOrganizations();
    }, [])

    useEffect(() => {
        displaySummary();
    }, [summary])


    const displaySummary = () => {
        if (summary == "empty") {
            return (
                <Grid item sm={12}>
                    <Typography>No infromation to display</Typography>
                </Grid>
            );
        } else {
            return (<>
                <div className={classes.header}>
                    <div className={classes.headerLogo}>
                        <Avatar className={classes.logo} src={require(`../../employer/images/${summary.logo}`).default} variant="square" />
                    </div>
                    <div className={classes.headerInfo}>
                        <Typography variant="h5" className={classes.title} >{summary.name}</Typography>
                        <Chip icon={<LocationOnRoundedIcon />} label={summary.locations.join(', ')} className={classes.tag} />
                    </div>
                    <div className={classes.reviews}>
                        <Rating name="read-only" value={getAvgRating(summary.reviews)} readOnly />
                    </div>
                    <Button className={classes.favButton}><FavoriteRounded className={classes.favorite} />Remove from favourites</Button>

                </div>
                <div className={classes.body} >
                    <Typography className={classes.description} >{summary.description}</Typography>
                </div>
                <div className={classes.footer} >
                    <Button className={classes.applyButton}>View Full Profile</Button>
                </div>
            </>
            );
        }
    };

    return (
        <div>
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12}>
                    <FloatCard>
                        {displaySummary()}
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default CompanySummary
