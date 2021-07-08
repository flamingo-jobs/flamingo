import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WorkIcon from "@material-ui/icons/Work";
import CreateIcon from "@material-ui/icons/Create";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ReactTimeAgo from "react-time-ago";

import {
  Typography,
  Grid,
  Container,
  IconButton,
  Avatar,
  Chip,
} from "@material-ui/core";
import FloatCard from "../../../components/FloatCard";
import ninix from "../images/99x.png";
import JobSummaryModal from "./jobSummaryModal";
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  jobTitle: {
    fontSize: "23px",
    fontWeight: 600,
    textAlign: "left",
    color: theme.palette.black,
  },
  companyIcon: {
    borderRadius: "12px",
    width: 50,
    height: 50,
  },
  companyName: {
    textAlign: "left",
    color: theme.palette.black,
    fontSize: "17px",
    fontWeight: 500,
  },
  companyAddress: {
    textAlign: "left",
    color: theme.palette.black,
  },
  jobDetailsContainer: {
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  createIcon: {
    fontSize: "20px",
    color: theme.palette.tagIcon,
    transition: "0.3s",
    "&:hover": {
      transition: "0.3s",
      color: theme.palette.black,
    },
  },
  description: {
    marginTop: theme.spacing(2),
    color: theme.palette.black,
  },
  locationAndType: {
    width: "100%",
    display: "flex",
    gap: "30px",
    marginTop: "12px",
  },
  location: {
    display: "flex",
    gap: "10px",
  },
  type: {
    display: "flex",
    gap: "10px",
  },
  locationIcon: {
    color: "#666",
  },
  locationText: {
    color: "#666",
  },
  typeIcon: {
    color: "#666",
  },
  typeText: {
    color: "#666",
  },
  time:{
    padding: "4px 0px",
    marginLeft: "20px",
  },
}));

const getFormattedDate = (date) => {
  // console.log("Due date", date);
  const dateStr = date.toString().slice(0,10).replaceAll("-","/");
  return dateStr;
};

function JobSummary(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSummaryChange = (event) => {
    const newJob = { ...props.job };
    if (event.target.name === "min" || event.target.name === "max") {
      newJob.salaryRange[event.target.name] = event.target.value;
    } else {
      // console.log("changed value", event.target.value);
      newJob[event.target.name] = event.target.value;
    }
    props.setJob(newJob);
  };

  const handleDueDateChange = (date) => {
    const newJob = { ...props.job };
    newJob.dueDate = date;
    props.setJob(newJob);
  }

  const handleSummarySubmit = async (e) => {
    e.preventDefault();
    const updateFields = {
      title: props.job.title,
      category: props.job.category,
      type: props.job.type,
      description: props.job.description,
      location: props.job.location,
      dueDate: props.job.dueDate,
      salaryRange: {
        min: props.job.salaryRange.min,
        max: props.job.salaryRange.max,
      },
    };

    try {
      const response = await axios.put(
        `${BACKEND_URL}/jobs/update/${props.jobId}`,
        updateFields
      );
      handleClose();
      props.setAlertData({
        severity: "success",
        msg: "Changes saved successfully!",
      });
      props.handleAlert();
      // console.log(response);
    } catch (err) {
      handleClose();
      props.setAlertData({
        severity: "error",
        msg: "Changes could not be applied",
      });
      props.handleAlert();
      console.log("Error: ", err);
    }
  };
  // style={{border: "1px solid red"}}
  return (
    <>
      <JobSummaryModal
        job={props.job}
        categories={props.categories}
        types={props.types}
        locations={props.locations}
        open={open}
        handleClose={handleClose}
        handleSummaryChange={handleSummaryChange}
        handleSummarySubmit={handleSummarySubmit}
        handleDueDateChange={handleDueDateChange}
      ></JobSummaryModal>

      <FloatCard>
        <Container className={classes.summaryContainer}>
          <Grid container xs={12}>
            <Grid item container>
              <Grid item container xs={11}>
                <Chip
                  icon={<LocalOfferRoundedIcon className={classes.tagIcon} />}
                  label={props.job.category}
                  className={classes.label}
                />
                <div className={classes.time}>
                  <Typography>
                    <ReactTimeAgo date={props.job.postedDate} locale="en-US" />
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={1}>
                <IconButton className={classes.iconButton} onClick={handleOpen}>
                  <CreateIcon className={classes.createIcon} />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  className={classes.companyIcon}
                  src={
                    require(`../../../employer/images/${props.job.organization.logo}`)
                      .default
                  }
                  variant="square"
                ></Avatar>
              </Grid>
              <Grid item>
                <Typography className={classes.jobTitle}>
                  {props.job.title}
                </Typography>
                <Typography className={classes.companyName}>
                  {props.job.organization.name}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.locationAndType}>
                <div className={classes.location}>
                  <LocationOnIcon
                    fontSize="small"
                    className={classes.locationIcon}
                  ></LocationOnIcon>
                  <Typography
                    variant="subtitle2"
                    className={classes.locationText}
                  >
                    {props.job.location}
                  </Typography>
                </div>

                <div className={classes.type}>
                  <WorkIcon
                    fontSize="small"
                    className={classes.typeIcon}
                  ></WorkIcon>
                  <Typography variant="subtitle2" className={classes.typeText}>
                    {props.job.type}
                  </Typography>
                </div>

                <div className={classes.type}>
                  <TodayIcon
                    fontSize="small"
                    className={classes.typeIcon}
                  ></TodayIcon>
                  <Typography variant="subtitle2" className={classes.typeText}>
                    {getFormattedDate(props.job.dueDate)}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography align="left" className={classes.description}>
                {(props.job.description)}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </FloatCard>
    </>
  );
}

export default JobSummary;
