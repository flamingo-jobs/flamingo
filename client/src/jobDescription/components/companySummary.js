import { Avatar, Button, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL, { FILE_URL } from '../../Config';
import LoginModal from "./loginModal";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setFavoriteOrgCount, setReduxFavoriteOrgIds } from "../../redux/actions";


const jwt = require("jsonwebtoken");
require("dotenv").config();


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
    },
    verifiedBadge:{
        marginLeft: "0.1em",
        width: "0.8em",
        height: "0.8em"
    }
}))

function CompanySummary(props) {

    const classes = useStyles();

    // Redux
    const dispatch = useDispatch();

    const [summary, setSummary] = useState("empty");
    const [verified,setVerified] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [jobseeker, setJobseeker] = useState("empty");

    const [alertShow, setAlertShow] = useState(false);
    const [alertData, setAlertData] = useState({ severity: "", msg: "" });

    const token = sessionStorage.getItem("userToken");

    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
            ? jwt.decode(token, { complete: true }).payload.userRole
            : null
    );

    const [logo, setLogo] = useState(require(`../../components/images/loadingImage.gif`).default);


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

    const handleAlert = () => {
        setAlertShow(true);
    };

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertShow(false);
    };

    const getAvgRating = (arr = []) => {
        return arr.map(item => item.rating).reduce((a, x) => a + x, 0) / arr.length;
    }

    const retrieveOrganizations = () => {
        axios.get(`${BACKEND_URL}/employers/${props.job.organization.id}`,).then(res => {
            if (res.data.success) {
                setSummary(res.data.employer)
                getVerificationStatus()
            } else {
                setSummary("empty")
            }
        })
    }

    const getVerificationStatus = () => {
        axios
          .get(`${BACKEND_URL}/employer/verificationStatus/${props.job.organization.id}`)
          .then((res) => {
            if (res.data.success) {
              if (res.data.verificationStatus === "verified") setVerified(true);
            }
          })
          .catch((err) => {
            if (err) {
              setVerified(false);
            }
          });
      };

    useEffect(() => {
        retrieveOrganizations();
    }, [props])

    useEffect(() => {
        displaySummary();
    }, [summary])

    useEffect(() => {
        retrieveJobseeker();
    }, []);

    useEffect(() => {
        if (jobseeker !== "empty") {
            if (jobseeker.favoriteOrganizations?.includes(props.job.organization.id)) {
                setIsFavorite(true);
            }
        }
    }, [jobseeker]);

    const retrieveJobseeker = async () => {
        try {
            if (props.userId && role === "jobseeker") {
                const response = await axios.get(`${BACKEND_URL}/jobseeker/${props.userId}`);
                if (response.data.success) {
                    setJobseeker(response.data.jobseeker);
                    dispatch(setReduxFavoriteOrgIds(response.data.jobseeker.favoriteOrganizations));
                }
            }
        } catch (err) {
            // console.log(err);
        }
    };


    const handleAddingFavorite = async () => {
        if (isFavorite) { // Unsave
            setIsFavorite(!isFavorite);
            const newFavoriteOrgs = jobseeker.favoriteOrganizations.filter((id) => id !== props.job.organization.id);
            try {
                const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
                if (response.data.success) {
                    dispatch(setFavoriteOrgCount(newFavoriteOrgs.length));
                    dispatch(setReduxFavoriteOrgIds(newFavoriteOrgs));
                    setAlertData({
                        severity: "success",
                        msg: "Organization Removed From Favorite Organizations",
                    });
                    handleAlert();
                }
            } catch (err) {
                setAlertData({
                    severity: "error",
                    msg: "Something Went Wrong. Please Try Again Later.",
                });
                handleAlert();
            }

        } else { // Save
            setIsFavorite(!isFavorite);
            const newFavoriteOrgs = [...jobseeker.favoriteOrganizations, props.job.organization.id];
            try {
                const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
                if (response.data.success) {
                    dispatch(setFavoriteOrgCount(newFavoriteOrgs.length));
                    dispatch(setReduxFavoriteOrgIds(newFavoriteOrgs));
                    setAlertData({
                        severity: "success",
                        msg: "Organization Saved, Successfully!",
                    });
                    handleAlert();
                }
            } catch (err) {
                setAlertData({
                    severity: "error",
                    msg: "Something Went Wrong. Please Try Again Later.",
                });
                handleAlert();
            }
        }
    }

    const displayFavoriteButton = () => {
        if (role !== "employer" && role !== "admin") {
            if (!role) {
                // When user is not signed in
                return (
                    <Button className={classes.favButton} onClick={handleLoginModal}>
                        <FavoriteBorderIcon className={classes.favorite} />
                        Add to Favorites
                    </Button>
                );
            } else if (role && role === "jobseeker") {
                if (isFavorite) {
                    // When user is signed in && Org is in favorites 
                    return (
                        <Button className={classes.favButton} onClick={handleAddingFavorite}>
                            <FavoriteRounded className={classes.favorite} />
                            Remove from favourites
                        </Button>
                    );
                } else {
                    // When user is signed in but Org is not in favorites
                    return (
                        <Button className={classes.favButton} onClick={handleAddingFavorite}>
                            <FavoriteBorderIcon className={classes.favorite} />
                            Add to Favorites
                        </Button>
                    );
                }
            }
        }
    }

    useEffect(() => {
        loadLogo();
    }, [])

    const loadLogo = async () => {
        await axios.get(`${FILE_URL}/employer-profile-pictures/${props.job.organization.id}.png`).then(res => {
            setLogo(`${FILE_URL}/employer-profile-pictures/${props.job.organization.id}.png`);
        }).catch(error => {
            setLogo(require(`../../employer/images/default_company_logo.png`).default);
        })
    }

    const displayAlert = () => {
        return (
            <SnackBarAlert
                open={alertShow}
                onClose={handleAlertClose}
                severity={alertData.severity}
                msg={alertData.msg}
            />
        );
    };

    const displaySummary = () => {
        if (summary === "empty") {
            return (
                <Grid item sm={12}>
                    <Typography>No infromation to display</Typography>
                </Grid>
            );
        } else {
            return (<>
                <div className={classes.header}>
                    <div className={classes.headerLogo}>
                        <Avatar className={classes.logo} src={logo} variant="square" />
                    </div>
                    <div className={classes.headerInfo}>
                        <Typography variant="h5" className={classes.title} >{summary.name}{verified?<VerifiedUserIcon className={classes.verifiedBadge} color="primary"/>:""}</Typography>
                        <Chip icon={<LocationOnRoundedIcon />} label={summary.locations.join(', ')} className={classes.tag} />
                    </div>
                    <div className={classes.reviews}>
                        <Rating name="read-only" value={getAvgRating(summary.reviews)} readOnly />
                    </div>
                    {displayFavoriteButton()}


                </div>
                <div className={classes.body} >
                    <Typography className={classes.description} >{summary.description}</Typography>
                </div>
                <div className={classes.footer} >
                    <Link to={`/employer/profile/${props.job.organization.id}`}>
                        <Button className={classes.applyButton}>View Full Profile</Button>
                    </Link>
                </div>
            </>
            );
        }
    };

    return (
        <div>
            {displayAlert()}

            <LoginModal
                open={open}
                handleClose={handleClose}
                jobId={props.job._id}
            ></LoginModal>

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
