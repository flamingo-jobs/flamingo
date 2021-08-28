import React, { useState, useEffect } from "react";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import {
  Avatar,
  Button,
  Chip,
  makeStyles,
  Typography,
} from "@material-ui/core";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import FloatCard from "../../../components/FloatCard";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BACKEND_URL from "../../../Config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSavedJobCount } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  jobContainer: {
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
    marginBottom: 5,
  },
  infoTags: {
    marginTop: 10,
    marginBottom: 10,
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
}));

const SavedJob = (props) => {
  const classes = useStyles();
  const [job, setJob] = useState("empty");

  const dispatch = useDispatch();

  useEffect(() => {
    retrieveJob();
  }, []);

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${props.jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadLogo = () => {
    try {
      return require(`../../../employer/images/${job.organization.logo}`)
        .default;
    } catch (err) {
      return require(`../../../employer/images/default_company_logo.png`)
        .default;
    }
  };

  const loadName = () => {
    try {
      return job.organization.name;
    } catch (err) {
      return "No Organization";
    }
  };

  const handleSavingJob = async (jobId) => {
    const newSavedJobIds = props.savedJobIds.filter((id) => id !== jobId);

    try {
      const response = await axios.patch(
        `${BACKEND_URL}/jobseeker/updateSavedJobs/${props.userId}`,
        newSavedJobIds
      );
      if (response.data.success) {
        props.setAlertData({ severity: "success", msg: "Job removed successfully!"});
        props.handleAlert();
        dispatch(setSavedJobCount(newSavedJobIds.length));
        props.setSavedJobIds(newSavedJobIds);
      }
    } catch (err) {
      // console.log(err);
      props.setAlertData({
        severity: "error",
        msg: "Sorry, Something went wrong. Please try again later.",
      });
      props.handleAlert();
    }
  };

  const displayJob = () => {
    if (job === "empty") return null;

    return (
        <FloatCard>
          <div className={classes.root}>
            <div className={classes.header}>
              <div className={classes.headerLeft}>
                <Chip
                  icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                  label={job.category}
                  className={classes.label}
                />
                <Typography className={classes.time}>
                  <ReactTimeAgo date={job.postedDate} locale="en-US" />
                </Typography>
              </div>
              <div className={classes.headerRight}>
                <BookmarkIcon
                  className={classes.favorite}
                  onClick={() => handleSavingJob(job._id)}
                />
              </div>
            </div>
            <div className={classes.body}>
              <Typography variant="h5" className={classes.title}>
                {job.title}
              </Typography>
              <Typography noWrap className={classes.description}>
                {job.description}
              </Typography>
              <div className={classes.infoTags}>
                <Chip
                  icon={<LocationOnRoundedIcon />}
                  label={job.location}
                  className={classes.tag}
                />
                <Chip
                  icon={<WorkRoundedIcon />}
                  label={job.type}
                  className={classes.tag}
                />
              </div>
            </div>
            <div className={classes.footer}>
              <div className={classes.footerLeft}>
                <Avatar
                  className={classes.logo}
                  src={loadLogo()}
                  variant="square"
                />
                <Typography className={classes.company}>
                  {loadName()}
                </Typography>
              </div>
              <div className={classes.footerRight}>
                <Link to={`/jobDescription/${job._id}`}>
                  <Button className={classes.applyButton}>View Job</Button>
                </Link>
              </div>
            </div>
          </div>
        </FloatCard>

    );
  };

  return (
    <>
      {displayJob()}
    </>
  );
};

export default SavedJob;
