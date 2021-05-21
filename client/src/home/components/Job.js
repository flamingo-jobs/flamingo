import React from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ifs from '../images/ifs.png';
import FloatCard from './FloatCard';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
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
        color: theme.palette.pinkyRed
    },
    body: {
        margin: 10
    },
    title: {
        fontWeight: 500,
        marginBottom: 5
    },
    infoTags: {
        marginTop: 10,
        marginBottom: 10
    },
    tag: {
        marginRight: 10,
        backgroundColor: 'white',
    },
    
    footerLeft: {
        display: 'flex',
        alignItems: 'center'
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    logo: {
        borderRadius: 12
    },
    company: {
        marginLeft: 10,
        fontWeight: 500
    },
    applyButton: {
        borderRadius: 12,
        backgroundColor: theme.palette.mediumTurquoise,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlue,
        }
    },
}))
function Job() {

    const classes = useStyles();

    return (
        <FloatCard >
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.headerLeft}>
                    <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label="Development" className={classes.label} />
                    <Typography className={classes.time}>6 days ago</Typography>
                </div>
                <div className={classes.headerRight}>
                    <FavoriteRounded className={classes.favorite} />
                </div>

            </div>
            <div className={classes.body} >
                <Typography variant="h5" className={classes.title} >Software Engineer</Typography>
                <Typography variant="p" className={classes.description} >We are looking for a software engineer to out rapid growing team.</Typography>
                <div className={classes.infoTags}>
                    <Chip icon={<LocationOnRoundedIcon />} label="Colombo" className={classes.tag} />
                    <Chip icon={<WorkRoundedIcon />} label="Full-time" className={classes.tag} />
                </div>
            </div>
            <div className={classes.footer} >
                <div className={classes.footerLeft}>
                    <Avatar className={classes.logo} src={ifs} variant="square" />
                    <Typography className={classes.company}>IFS R & D</Typography>
                </div>
                <div className={classes.footerRight} >
                    <Button className={classes.applyButton}>Apply Now</Button>
                </div>
            </div>
        </div>
        </FloatCard>
    )
}

export default Job
