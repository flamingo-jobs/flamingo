import React, { useState, useEffect } from "react";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { FavoriteRounded } from "@material-ui/icons";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import FloatCard from "../../components/FloatCard";
import Rating from "@material-ui/lab/Rating";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BACKEND_URL from "../../Config";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginModal from "./loginModal";
import SnackBarAlert from "../../components/SnackBarAlert";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      display: "block",
      alignItems: "flex-start",
      textAlign: 'center',
      margin: 0,
      marginBottom: 10
    }
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
      margin: 0,
      marginBottom: 10
    }
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
      margin: 0,
      marginBottom: 10,
      order: 2
    }
  },
  headerRight: {
    order: 1,
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      left: "90%",
      width: 'fit-content',
      order: 1
    }
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

  footerLeft: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
      marginBottom: 10
    }
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center'
    }
  },
  logo: {
    borderRadius: 12,
    width: 70,
    height: 70,
    [theme.breakpoints.down('sm')]: {
     display: 'inline-block'
    }
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

function OrganizationCard(props) {
  const classes = useStyles();

  const [isSaved, setIsSaved] = useState(false);

  const token = sessionStorage.getItem("userToken");
  const userId = sessionStorage.getItem("loginId");

  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.userRole
      : null
  );

  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

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
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  useEffect(() => {
    if (props.favoriteOrgs !== "empty") {
      setIsSaved(props.favoriteOrgs.includes(props.info._id));
    } else {
      setIsSaved(false);
    }
  }, [props.favoriteOrgs]);

  const getAvgRating = (arr = []) => {
    return (
      arr.map((item) => item.rating).reduce((a, x) => a + x, 0) / arr.length
    );
  };

  const loadLogo = () => {
    try {
      return require(`../images/${props.info.logo}`).default;
    } catch (err) {
      return require(`../images/default_company_logo.png`).default;
    }
  };

  const handleAddingFavorite = async () => {
    if (isSaved) {
      // Unsave
      setIsSaved(!isSaved);
      const newFavoriteOrgs = props.favoriteOrgs.filter(
        (id) => id !== props.info._id
      );
      props.setFavoriteOrgs(newFavoriteOrgs);

      try {
        const response = await axios.patch(
          `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${userId}`,
          newFavoriteOrgs
        );
        if (response.data.success) {
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
    } else {
      // Save
      setIsSaved(!isSaved);
      const newFavoriteOrgs = [...props.favoriteOrgs, props.info._id];
      props.setFavoriteOrgs(newFavoriteOrgs);
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/jobseeker/updateFavoriteOrgs/${userId}`,
          newFavoriteOrgs
        );
        if (response.data.success) {
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
  };

  const displayFavoriteIcon = () => {
    if (!role) {
      // When user is not signed in
      return (
        <FavoriteBorderIcon
          className={classes.favorite}
          onClick={handleLoginModal}
        />
      );
    } else if (role === "jobseeker") {
      if (isSaved) {
        // When user is signed in && Org is in favorites
        return (
          <FavoriteRounded
            className={classes.favorite}
            onClick={handleAddingFavorite}
          />
        );
      } else {
        // When user is signed in but Org is not in favorites
        return (
          <FavoriteBorderIcon
            className={classes.favorite}
            onClick={handleAddingFavorite}
          />
        );
      }
    }
  };

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

  return (
    <FloatCard>
      {displayAlert()}

      <LoginModal open={open} handleClose={handleClose}></LoginModal>

      <div className={classes.root}>
        <div className={classes.header}>
        <div className={classes.headerRight}>{displayFavoriteIcon()}</div>
          <div className={classes.headerLeft}>
            <Avatar
              className={classes.logo}
              src={loadLogo()}
              variant="square"
            />
            <div className={classes.headerInfo}>
              <Typography variant="h5" className={classes.title}>
                {props.info.name}
              </Typography>
              <Chip
                icon={<LocationOnRoundedIcon />}
                label={props.info.locations.join(", ")}
                className={classes.tag}
              />
            </div>
          </div>
          
        </div>
        <div className={classes.body}>
          <Typography noWrap className={classes.description}>
            {props.info.description}
          </Typography>
        </div>
        <div className={classes.infoTags}>
          <Typography>5 openings</Typography>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerLeft}>
            <Rating
              name="read-only"
              value={getAvgRating(props.info.reviews)}
              readOnly
            />
          </div>
          <div className={classes.footerRight}>
            <Link to={`/employer/company/${props.info._id}`}>
              <Button className={classes.applyButton}>View Organization</Button>
            </Link>
          </div>
        </div>
      </div>
    </FloatCard>
  );
}

export default OrganizationCard;
