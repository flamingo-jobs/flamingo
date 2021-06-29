import React from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';
import Rating from '@material-ui/lab/Rating';

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
        marginLeft: 10
    },
    infoTags: {
        margin: 10
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
        borderRadius: 12,
        width: 70,
        height: 70
    },
    company: {
        marginLeft: 10,
        fontWeight: 500
    },
    applyButton: {
        borderRadius: 12,
        backgroundColor: theme.palette.vividSkyBlue,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.mediumTurquoise,
        }
    },
    headerInfo: {
        display: 'block'
    }
}))

function OrganizationCard(props) {

    const classes = useStyles();

    const getAvgRating = (arr = []) => {
        console.log(arr);
        return arr.map(item => item.rating).reduce((a, x) => a + x, 0) / arr.length;
    }

    return (
        <FloatCard >
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <Avatar className={classes.logo} src={require(`../images/${props.info.logo}`).default} variant="square" />
                        <div className={classes.headerInfo}>
                            <Typography variant="h5" className={classes.title} >{props.info.name}</Typography>
                            <Chip icon={<LocationOnRoundedIcon />} label={props.info.locations.join(', ')} className={classes.tag} />
                        </div>
                    </div>
                    <div className={classes.headerRight}>
                        <FavoriteRounded className={classes.favorite} />
                    </div>

                </div>
                <div className={classes.body} >

                    <Typography noWrap className={classes.description} >{props.info.description}</Typography>


                </div>
                <div className={classes.infoTags}>
                    <Typography>5 openings</Typography>
                </div>
                <div className={classes.footer} >

                    <div className={classes.footerLeft}>
                        <Rating name="read-only" value={getAvgRating(props.info.reviews)} readOnly />
                    </div>
                    <div className={classes.footerRight} >
                        <Button className={classes.applyButton}>View Organization</Button>
                    </div>
                </div>
            </div>
        </FloatCard>
    )
}

export default OrganizationCard
