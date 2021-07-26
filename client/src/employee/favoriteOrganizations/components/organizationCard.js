import React, {useState} from "react";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import FloatCard from "../../../components/FloatCard";
import Rating from "@material-ui/lab/Rating";
import BACKEND_URL from "../../../Config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  orgContainer:{
    marginBottom: theme.spacing(3),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  favorite: {
    display: "block",
    color: theme.palette.pinkyRed,
    "&:hover":{
      cursor: "pointer"
    },
  },
  body: {
    margin: 10,
  },
  title: {
    fontWeight: 500,
    marginLeft: 10,
  },
  infoTags: {
    margin: 10,
  },
  tag: {
    marginRight: 10,
    backgroundColor: "white",
  },

  footerLeft: {
    display: "flex",
    alignItems: "center",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  logo: {
    borderRadius: 12,
    width: 70,
    height: 70,
  },
  company: {
    marginLeft: 10,
    fontWeight: 500,
  },
  applyButton: {
    borderRadius: 12,
    backgroundColor: theme.palette.vividSkyBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
  },
  headerInfo: {
    display: "block",
  },
}));

const OrganizationCard = (props) => {
  const classes = useStyles();

  const [isSaved, setIsSaved] = useState(true);

  const getAvgRating = (arr = []) => {
    return (
      arr.map((item) => item.rating).reduce((a, x) => a + x, 0) / arr.length
    );
  };

  const loadLogo = () => {
    try {
      return require(`../../../employer/images/${props.org.logo}`).default;
    } catch (err) {
      return require(`../../../employer/images/default_company_logo.png`)
        .default;
    }
  };

  const handleSavingOrg = async (orgId) => {
    if(isSaved){
      setIsSaved(!isSaved);
      const newFavoriteOrgs = props.favoriteOrgIdsForDB.filter((id) => id !== orgId);
      props.setFavoriteOrgIdsForDB(newFavoriteOrgs);

      try {
        const response = await axios.patch(`${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`, newFavoriteOrgs);
        if (response.data.success) {
          // console.log('success');
        }
      } catch (err) {
        console.log(err);
      }

    } else {
      setIsSaved(!isSaved);
      const newFavoriteOrgs = [...props.favoriteOrgIdsForDB, orgId];
      props.setFavoriteOrgIdsForDB(newFavoriteOrgs);

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

  return (
    <div className={classes.orgContainer}>
      <FloatCard>
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <Avatar
                className={classes.logo}
                src={loadLogo()}
                variant="square"
              />
              <div className={classes.headerorg}>
                <Typography variant="h5" className={classes.title}>
                  {props.org.name}
                </Typography>
                <Chip
                  icon={<LocationOnRoundedIcon />}
                  label={props.org.locations.join(", ")}
                  className={classes.tag}
                />
              </div>
            </div>
            <div className={classes.headerRight}>
              {isSaved && <FavoriteIcon className={classes.favorite} onClick={() => handleSavingOrg(props.org._id)}/>}
              {!isSaved && <FavoriteBorderIcon className={classes.favorite} onClick={() => handleSavingOrg(props.org._id)}/>}
            </div>
          </div>
          <div className={classes.body}>
            <Typography noWrap className={classes.description}>
              {props.org.description}
            </Typography>
          </div>
          <div className={classes.orgTags}>
            <Typography>5 openings</Typography>
          </div>
          <div className={classes.footer}>
            <div className={classes.footerLeft}>
              <Rating
                name="read-only"
                value={getAvgRating(props.org.reviews)}
                readOnly
              />
            </div>
            <div className={classes.footerRight}>
              <Button className={classes.applyButton}>View Organization</Button>
            </div>
          </div>
        </div>
      </FloatCard>
    </div>
  );
};

export default OrganizationCard;
