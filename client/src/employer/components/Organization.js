import React, {useState, useEffect} from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BACKEND_URL from "../../Config";
import axios from "axios";
import LoginModal from './loginModal';
const jwt = require("jsonwebtoken");

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
        "&:hover": {
            cursor: "pointer",
        }
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
            backgroundColor: theme.palette.mediumTurquoiseHover,
        }
    },
}))

function Organization(props) {

    const classes = useStyles();
    const [isSaved, setIsSaved] = useState(false);

    const [alertShow, setAlertShow] = useState(false);
    const [alertData, setAlertData] = useState({ severity: "", msg: "" });

    const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
    const token = sessionStorage.getItem("userToken");
    const [role, setRole] = useState(
      jwt.decode(token, { complete: true })
        ? jwt.decode(token, { complete: true }).payload.userRole
        : null
    );
    const userId = sessionStorage.getItem("loginId");

    // Login modal 
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLoginModal = () => {
        handleOpen();
    }

    useEffect(() => {
        if(!role){
            setIsSaved(false);
        } else if(role && role === "jobseeker"){
            setIsSaved(props.favoriteOrgIds.includes(props.info._id));
        }
    }, [props.favoriteOrgIds, props.info]);

    const handleSavingOrg = async () => {
        if(isSaved){ // Unsave
            setIsSaved(!isSaved);
            const newFavoriteOrgIds = props.favoriteOrgIds.filter((id) => id !== props.info._id);
            props.setFavoriteOrgIds(newFavoriteOrgIds);

            try {
                const response = await axios.patch(
                    `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${userId}`, newFavoriteOrgIds);

                if (response.data.success) {
                    props.setAlertData({
                        severity: "success",
                        msg: "Organization Removed From Favorites",
                    });
                    props.handleAlert();
                }
            } catch (err) {
                props.setAlertData({
                    severity: "error",
                    msg: "Something Went Wrong. Please Try Again Later.",
                });
                props.handleAlert();
            }

        } else{ // Save
            setIsSaved(!isSaved);
            const newFavoriteOrgIds = [...props.favoriteOrgIds, props.info._id];
            props.setFavoriteOrgIds(newFavoriteOrgIds);
      
            try {
                const response = await axios.patch(
                    `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${userId}`, newFavoriteOrgIds);
                if (response.data.success) {
                    props.setAlertData({
                        severity: "success",
                        msg: "Organization Removed From Favorites",
                    });
                    props.handleAlert();
                }
            } catch (err) {
                props.setAlertData({
                    severity: "error",
                    msg: "Something Went Wrong. Please Try Again Later.",
                });
                props.handleAlert();
            }
        }
    }

    const displaySaveIcon = () => {
        if(!isSignedIn){
            // When user is not signed in
            return <FavoriteBorderIcon className={classes.favorite} onClick={handleLoginModal} />;
        } else {
            if(role === "jobseeker" && isSaved){
                // When user is signed in && org is in favoriteOrgs 
                return <FavoriteRounded className={classes.favorite} onClick={handleSavingOrg} />;
            } else if(role === "jobseeker" && !isSaved){
                // When user is signed in but org is not in favoriteOrgs
                return <FavoriteBorderIcon className={classes.favorite} onClick={handleSavingOrg}/>;
            }
        }
    }

    

    return (
        <FloatCard >

            {/* Works only when user is not signed in */}
            <LoginModal 
                open={open}
                handleClose={handleClose}
            ></LoginModal>

            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <Avatar className={classes.logo} src={require(`../images/${props.info.logo}`).default} variant="square" />
                        <div className={classes.info}>
                            <Typography variant="h6" className={classes.company}>{props.info.name}</Typography>
                            <Typography>{props.info.openings}5 openings</Typography>
                        </div>
                    </div>
                    <div className={classes.headerRight} >
                        {displaySaveIcon()}
                    </div>
                </div>
            </div>
        </FloatCard>
    )
}

export default Organization
