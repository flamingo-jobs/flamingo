import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FloatCard from '../../components/FloatCard';
import { FILE_URL } from '../../Config';


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
            backgroundColor: theme.palette.vividSkyBlueHover,
        }
    },
    headerInfo: {
        display: 'block'
    },
    tagline: {
        marginLeft: 10,
        marginRight: 10
    }
}))

function PeopleCard(props) {

    const classes = useStyles();
    const [logo, setLogo] = useState(require(`../../components/images/loadingImage.gif`).default);

    useEffect(() => {
        loadLogo();
    }, [])

    const loadLogo = async () => {
        await axios.get(`${FILE_URL}/jobseeker-profile-pictures/${props.info._id}.png`).then(res => {
            setLogo(`${FILE_URL}/jobseeker-profile-pictures/${props.info._id}.png`);
        }).catch(error => {
            setLogo({});
        })
    }

    return (
        <FloatCard >
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <Avatar className={classes.logo} src={logo} variant="square" />
                        <div className={classes.headerInfo}>
                            <Typography variant="h5" className={classes.title} >{props.info.name}</Typography>
                            <Typography className={classes.tagline}>{props.info.tagline}</Typography>
                        </div>
                    </div>
                    <div className={classes.headerRight}>
                    </div>

                </div>
                <div className={classes.body} >

                    <Typography noWrap className={classes.description} >{props.info.intro}</Typography>
                    <div className={classes.infoTags}>
                        {props.info.education && props.info.education.length > 0 ? <Chip icon={<SchoolRoundedIcon />} label={props.info.education[0].institute} className={classes.tag} /> : null}
                        {props.info.work.length > 0 ? <Chip icon={<WorkRoundedIcon />} label={props.info.work[props.info.work.length - 1].place} className={classes.tag} /> : null}

                    </div>
                </div>

                <div className={classes.footer} >

                    <div className={classes.footerLeft}>

                    </div>
                    <div className={classes.footerRight} >
                        <Link to={`/jobseeker/profile/${props.info._id}`}>
                            <Button className={classes.applyButton}>View Profile</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </FloatCard >
    )
}

export default PeopleCard
