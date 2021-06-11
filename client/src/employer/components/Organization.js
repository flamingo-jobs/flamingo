import React from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';

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
    info: {
        display: 'block',
        marginLeft: 10,
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
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    company: {

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
function Organization(props) {

    const classes = useStyles();

    return (
        <FloatCard >
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <Avatar className={classes.logo} src={require(`../images/${props.info.logo}`).default} variant="square" />
                        <div className={classes.info}>
                            <Typography variant="h6" className={classes.company}>{props.info.name}</Typography>
                            <Typography>{props.info.openings} openings</Typography>
                        </div>
                    </div>
                    <div className={classes.headerRight} >
                        <FavoriteRounded className={classes.favorite} />
                    </div>
                </div>
            </div>
        </FloatCard>
    )
}

export default Organization
