import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import FloatCard from "../../../components/FloatCard";
import Rating from "@material-ui/lab/Rating";
import BACKEND_URL, { FILE_URL } from "../../../Config";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setFavoriteOrgCount, setReduxFavoriteOrgIds } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  orgContainer: {
    // marginBottom: theme.spacing(3),
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
    "&:hover": {
      cursor: "pointer",
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
  orgTags: {
    marginLeft: 10,
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
  const [logo, setLogo] = useState(require(`../../../components/images/loadingImage.gif`).default);

  // Redux
  const dispatch = useDispatch();

  const getAvgRating = (arr = []) => {
    return (
      arr.map((item) => item.rating).reduce((a, x) => a + x, 0) / arr.length
    );
  };

  useEffect(() => {
    loadLogo();
  }, []);

  const loadLogo = async () => {
    await axios.get(`${FILE_URL}/employer-profile-pictures/${props.org._id}.png`).then(res => {
      setLogo(`${FILE_URL}/employer-profile-pictures/${props.org._id}.png`);
    }).catch(error => {
      setLogo(require(`../../../employer/images/default_company_logo.png`).default);
    })
  }

  const handleSavingOrg = async (orgId) => {
    const newFavoriteOrgs = props.favoriteOrgIds.filter((id) => id !== orgId);
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${props.userId}`,
        newFavoriteOrgs
      );
      if (response.data.success) {
        props.setAlertData({
          severity: "success",
          msg: "Organization removed successfully!",
        });
        props.handleAlert();
        dispatch(setFavoriteOrgCount(newFavoriteOrgs.length));
        dispatch(setReduxFavoriteOrgIds(newFavoriteOrgs));
        props.setFavoriteOrgIds(newFavoriteOrgs);
      }
    } catch (err) {
      props.setAlertData({
        severity: "error",
        msg: "Sorry, Something went wrong. Please try again later.",
      });
      props.handleAlert();
    }
  };

  return (
    <div className={classes.orgContainer}>
      <FloatCard>
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <Avatar
                className={classes.logo}
                src={logo}
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
              {isSaved && (
                <FavoriteIcon
                  className={classes.favorite}
                  onClick={() => handleSavingOrg(props.org._id)}
                />
              )}
              {!isSaved && (
                <FavoriteBorderIcon
                  className={classes.favorite}
                  onClick={() => handleSavingOrg(props.org._id)}
                />
              )}
            </div>
          </div>
          <div className={classes.body}>
            <Typography noWrap className={classes.description}>
              {props.org.description}
            </Typography>
          </div>
          <div className={classes.orgTags}>
            {/* <Typography>5 openings</Typography> */}
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
              <Link to={`/employer/company/${props.org._id}`}>
                <Button className={classes.applyButton}>View Organization</Button>
              </Link>
            </div>
          </div>
        </div>
      </FloatCard>
    </div>
  );
};

export default OrganizationCard;
