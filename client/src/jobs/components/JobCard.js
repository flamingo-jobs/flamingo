import React, {useState} from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BACKEND_URL from "../../Config";
import axios from "axios";

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
        color: theme.palette.pinkyRed,
        "&:hover":{
            cursor: "pointer",
        },
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
        backgroundColor: theme.palette.vividSkyBlue,
        color: theme.palette.white,
        "&:hover": {
            backgroundColor: theme.palette.vividSkyBlueHover,
        }
    },
}))

function JobCard(props) {

    const classes = useStyles();
    const { loading = false } = props;
    const [isSaved, setIsSaved] = useState(props.savedJobIds.includes(props.info._id));

    const loadLogo = () => {
        try {
            return require(`../../employer/images/${props.info.organization.logo}`).default;
        } catch (err) {
            return require(`../../employer/images/default_company_logo.png`).default;
        }
    }

    const loadName = () => {
        try {
            return props.info.organization.name;
        } catch (err) {
            return "No Organization";
        }
    }

    const handleLoginModal = () => {
        props.handleOpen();
    }

    const handleSavingJob = async () => {
        if(isSaved){ // Unsave
            setIsSaved(!isSaved);
            const newSavedJobIds = props.savedJobIds.filter((id) => id !== props.info._id);
            props.setSavedJobIds(newSavedJobIds);

            try {
                const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateSavedJobs/${props.userId}`, newSavedJobIds);
                if (response.data.success) {
                // console.log('success');
                }
            } catch (err) {
                console.log(err);
            }

        } else{ // Save
            setIsSaved(!isSaved);
            const newSavedJobIds = [...props.savedJobIds, props.info._id];
            props.setSavedJobIds(newSavedJobIds);
      
            try {
              const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateSavedJobs/${props.userId}`, newSavedJobIds);
              if (response.data.success) {
                // console.log('success');
              }
            } catch (err) {
              console.log(err);
            }
        }
    }

    const displaySaveIcon = () => {
        if(!props.userRole){
            // When user is not signed in
            return <BookmarkBorderRoundedIcon className={classes.favorite} onClick={handleLoginModal} />;
        } else {
            if(isSaved){
                // When user is signed in && Job is in savedjobs 
                return <BookmarkIcon className={classes.favorite} onClick={handleSavingJob} />;
            } else {
                // When user is signed in but Job is not in savedJobs
                return <BookmarkBorderRoundedIcon className={classes.favorite} onClick={handleSavingJob}/>;
            }
        }
    }

    return (
        <FloatCard >
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.headerLeft}>
                    <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label={props.info.category} className={classes.label} />
                    <Typography className={classes.time}><ReactTimeAgo date={props.info.postedDate} locale="en-US"/></Typography>
                </div>
                <div className={classes.headerRight}>
                    {displaySaveIcon()}
                </div>

            </div>
            <div className={classes.body} >
                <Typography variant="h5" className={classes.title} >{props.info.title}</Typography>
                <Typography noWrap className={classes.description} >{props.info.description}</Typography>
                <div className={classes.infoTags}>
                    <Chip icon={<LocationOnRoundedIcon />} label={props.info.location} className={classes.tag} />
                    <Chip icon={<WorkRoundedIcon />} label={props.info.type} className={classes.tag} />
                </div>
            </div>
            <div className={classes.footer} >
                <div className={classes.footerLeft}>
                    <Avatar className={classes.logo} src={loadLogo()} variant="square" />
                    <Typography className={classes.company}>{loadName()}</Typography>
                </div>
                <div className={classes.footerRight} >
                <Link to={`/jobDescription/${props.info._id}`}><Button className={classes.applyButton}>View Job</Button></Link>
                </div>
            </div>
        </div>
        </FloatCard>
    )
}

export default JobCard
