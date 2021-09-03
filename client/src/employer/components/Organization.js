import React, { useState, useEffect } from 'react'
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FloatCard from '../../components/FloatCard';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BACKEND_URL, { FILE_URL } from "../../Config";
import axios from "axios";
import LoginModal from './loginModal';
import { useDispatch } from "react-redux";
import { setFavoriteOrgCount, setReduxFavoriteOrgIds } from "../../redux/actions";
import { Link } from 'react-router-dom';

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

    // Redux
    const dispatch = useDispatch();

    const [isSaved, setIsSaved] = useState(false);
    const [logo, setLogo] = useState(require(`../../components/images/loadingImage.gif`).default);

    const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
    const token = sessionStorage.getItem("userToken");
    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
            ? jwt.decode(token, { complete: true }).payload.userRole
            : null
    );
    const userId = sessionStorage.getItem("loginId");
    const [openings, setOpenings] = useState(false);
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
        if (!role) {
            setIsSaved(false);
        } else if (role && role === "jobseeker") {
            setIsSaved(props.favoriteOrgIds.includes(props.info._id));
        }
    }, [props.favoriteOrgIds, props.info]);

    useEffect(() => {
        loadLogo();
        loadOpenings();
    }, [])

    const handleSavingOrg = async () => {
        if (isSaved) { // Unsave
            setIsSaved(!isSaved);
            const newFavoriteOrgIds = props.favoriteOrgIds.filter((id) => id !== props.info._id);
            props.setFavoriteOrgIds(newFavoriteOrgIds);

            try {
                const response = await axios.patch(
                    `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${userId}`, newFavoriteOrgIds);

                if (response.data.success) {
                    dispatch(setFavoriteOrgCount(newFavoriteOrgIds.length));
                    dispatch(setReduxFavoriteOrgIds(newFavoriteOrgIds));
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

        } else { // Save
            setIsSaved(!isSaved);
            const newFavoriteOrgIds = [...props.favoriteOrgIds, props.info._id];
            props.setFavoriteOrgIds(newFavoriteOrgIds);

            try {
                const response = await axios.patch(
                    `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${userId}`, newFavoriteOrgIds);
                if (response.data.success) {
                    dispatch(setFavoriteOrgCount(newFavoriteOrgIds.length));
                    dispatch(setReduxFavoriteOrgIds(newFavoriteOrgIds));
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

    const loadOpenings = () => {
        axios.get(`${BACKEND_URL}/jobs/getOpeningsByOrg/${props.info._id}`).then(res => {
            if (res.data.success) {
                setOpenings(res.data.jobCount);
            } else {
                setOpenings("empty");
            }
        })
    }

    const displaySaveIcon = () => {
        if (!isSignedIn) {
            // When user is not signed in
            return <FavoriteBorderIcon className={classes.favorite} onClick={handleLoginModal} />;
        } else {
            if (role === "jobseeker" && isSaved) {
                // When user is signed in && org is in favoriteOrgs 
                return <FavoriteRounded className={classes.favorite} onClick={handleSavingOrg} />;
            } else if (role === "jobseeker" && !isSaved) {
                // When user is signed in but org is not in favoriteOrgs
                return <FavoriteBorderIcon className={classes.favorite} onClick={handleSavingOrg} />;
            }
        }
    }

    const loadLogo = async () => {
        await axios.get(`${FILE_URL}/employer-profile-pictures/${props.info._id}.png`).then(res => {
            setLogo(`${FILE_URL}/employer-profile-pictures/${props.info._id}.png`);
        }).catch(error => {
            axios.get(`${FILE_URL}/employer-profile-pictures/${props.info._id}.jpg`).then(res => {
                setLogo(`${FILE_URL}/employer-profile-pictures/${props.info._id}.jpg`);
            }).catch(error => {
                axios.get(`${FILE_URL}/employer-profile-pictures/${props.info._id}.PNG`).then(res => {
                    setLogo(`${FILE_URL}/employer-profile-pictures/${props.info._id}.PNG`);
                }).catch(error => {
                    setLogo(require(`../../employer/images/default_company_logo.png`).default);
                })
            })
        })
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
                        <Link to={`/employer/profile/${props.info._id}`}>
                            <Avatar className={classes.logo} src={logo} variant="square" />
                        </Link>
                        <div className={classes.info}>
                            <Typography variant="h6" className={classes.company}>{props.info.name}</Typography>
                            {openings && openings !== "empty" ?
                                <Typography>{openings} openings</Typography> : null}
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
