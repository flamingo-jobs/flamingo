import React, {useState, useEffect} from 'react'
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';
import Rating from '@material-ui/lab/Rating';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
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
    }
}))

function OrganizationCard(props) {

    const classes = useStyles();

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if(!props.userRole){
            setIsSaved(false);
        } else{
            setIsSaved(props.favoriteOrgs.includes(props.info._id));
        }
    }, [props.userRole]);

    const getAvgRating = (arr = []) => {
        return arr.map(item => item.rating).reduce((a, x) => a + x, 0) / arr.length;
    }

    const loadLogo = () => {
        try {
            return require(`../images/${props.info.logo}`).default;
        } catch (err) {
            return require(`../images/default_company_logo.png`).default;
        }
    }
    
    const handleLoginModal = () => {
        props.handleOpen();
    }

    const handleAddingFavorite = async () => {
        if(isSaved){ // Unsave
            setIsSaved(!isSaved);
            const newFavoriteOrgs = props.favoriteOrgs.filter((id) => id !== props.info._id);
            props.setFavoriteOrgs(newFavoriteOrgs);
            try {
                const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
                if (response.data.success) {
                // console.log('success');
                }
            } catch (err) {
                console.log(err);
            }

        } else{ // Save
            setIsSaved(!isSaved);
            const newFavoriteOrgs = [...props.favoriteOrgs, props.info._id];
            props.setFavoriteOrgs(newFavoriteOrgs);
            try {
              const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
              if (response.data.success) {
                // console.log('success');
              }
            } catch (err) {
              console.log(err);
            }
        }
    }

    const displayFavoriteIcon = () => {
        if(!props.userRole){
            // When user is not signed in
            return <FavoriteBorderIcon className={classes.favorite} onClick={handleLoginModal} />;
        } else {
            if(isSaved){
                // When user is signed in && Org is in favorites 
                return <FavoriteRounded className={classes.favorite} onClick={handleAddingFavorite} />;
            } else {
                // When user is signed in but Org is not in favorites
                return <FavoriteBorderIcon className={classes.favorite} onClick={handleAddingFavorite}/>;
            }
        }
    }

    return (
        <FloatCard >
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.headerLeft}>
                        <Avatar className={classes.logo} src={loadLogo()} variant="square" />
                        <div className={classes.headerInfo}>
                            <Typography variant="h5" className={classes.title} >{props.info.name}</Typography>
                            <Chip icon={<LocationOnRoundedIcon />} label={props.info.locations.join(', ')} className={classes.tag} />
                        </div>
                    </div>
                    <div className={classes.headerRight}>
                        {displayFavoriteIcon()}
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
