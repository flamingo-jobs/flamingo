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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LoginModal from "./loginModal";

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
    }
}))

function CompanySummary(props) {

    const classes = useStyles();

    const [summary, setSummary] = useState("empty");
    const [isFavorite, setIsFavorite] = useState(false);
    const [jobseeker, setJobseeker] = useState("empty");

    const token = sessionStorage.getItem("userToken");

    const [role, setRole] = useState(
        jwt.decode(token, { complete: true })
        ? jwt.decode(token, { complete: true }).payload.userRole
        : null
    );

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

    const getAvgRating = (arr = []) => {
        return arr.map(item => item.rating).reduce((a, x) => a + x, 0) / arr.length;
    }

    const retrieveOrganizations = () => {
        axios.get(`${BACKEND_URL}/employers/${props.job.organization.id}`,).then(res => {
            if (res.data.success) {
                setSummary(res.data.employer)
            } else {
                setSummary("empty")
            }
        })
    }

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
        if(jobseeker !== "empty"){
            if(jobseeker.favoriteOrganizations?.includes(props.job.organization.id)){
                setIsFavorite(true);
            }
        }
    }, [jobseeker]);

    const retrieveJobseeker = async () => {
        try {
          if(props.userId && role === "jobseeker"){
            const response = await axios.get(`${BACKEND_URL}/jobseeker/${props.userId}`);
            if (response.data.success) {
              setJobseeker(response.data.jobseeker);
            }
          }
        } catch (err) {
          console.log(err);
        }
      };
    

    const handleAddingFavorite = async () => {
        if(isFavorite){ // Unsave
            setIsFavorite(!isFavorite);
            const newFavoriteOrgs = jobseeker.favoriteOrganizations.filter((id) => id !== props.job.organization.id);
            try {
                const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
                if (response.data.success) {
                console.log('success');
                }
            } catch (err) {
                console.log(err);
            }

        } else{ // Save
            setIsFavorite(!isFavorite);
            const newFavoriteOrgs = [...jobseeker.favoriteOrganizations, props.job.organization.id];
            try {
              const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
              if (response.data.success) {
                console.log('success');
              }
            } catch (err) {
              console.log(err);
            }
        }
    }

    const displayFavoriteButton = () => {
        if(role !== "employer" && role !== "admin"){
            if(!role){
                // When user is not signed in
                return (
                    <Button className={classes.favButton} onClick={handleLoginModal}>
                        <FavoriteBorderIcon className={classes.favorite}/>
                        Add to Favorites
                    </Button>
                );
            } else if(role && role==="jobseeker"){
                if(isFavorite){
                    // When user is signed in && Org is in favorites 
                    return (
                        <Button className={classes.favButton} onClick={handleAddingFavorite}>
                            <FavoriteRounded className={classes.favorite}/>
                            Remove from favourites
                        </Button>
                    );
                } else {
                    // When user is signed in but Org is not in favorites
                    return (
                        <Button className={classes.favButton} onClick={handleAddingFavorite}>
                            <FavoriteBorderIcon className={classes.favorite}/>
                            Add to Favorites
                        </Button>
                    );
                }
            }
        }
    }

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
                        <Avatar className={classes.logo} src={require(`../../employer/images/${summary.logo}`).default} variant="square" />
                    </div>
                    <div className={classes.headerInfo}>
                        <Typography variant="h5" className={classes.title} >{summary.name}</Typography>
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
                    <Button className={classes.applyButton}>View Full Profile</Button>
                </div>
            </>
            );
        }
    };

    return (
        <div>
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
