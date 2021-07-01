import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import CreateIcon from "@material-ui/icons/Create";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import axios from "axios";
import BACKEND_URL from "../../../Config";

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
    fontWeight: 600,
    textAlign: "left",
    color: theme.palette.black,
  },
  companyIcon: {
    borderRadius: "12px",
  },
  companyName: {
    textAlign: "left",
    color: theme.palette.black,
  },
  companyAddress: {
    textAlign: "left",
    color: theme.palette.black,
  },
  jobCategory: {
    color: theme.palette.tagIcon,
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
  },
  description: {
    marginTop: theme.spacing(2),
    color: theme.palette.black,
  },
}));

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
      console.log("changed value", event.target.value);
      newJob[event.target.name] = event.target.value;
    }
    props.setJob(newJob);
  };

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
      props.setChangesApplied(true);
      handleClose();
      setTimeout(() => props.setChangesApplied(false), 10000);
      // console.log(response);
    } catch (err) {
      props.setChangesNotApplied(true);
      handleClose();
      setTimeout(() => props.setChangesNotApplied(false), 10000);
      console.log("Error: ", err);
    }
  };

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
              </Grid>
              <Grid item xs={1}>
                <IconButton className={classes.iconButton} onClick={handleOpen}>
                  <CreateIcon className={classes.createIcon} />
                </IconButton>
              </Grid>
            </Grid>

            <Typography variant="h5" className={classes.jobTitle}>
              {props.job.title}
            </Typography>
            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  className={classes.companyIcon}
                  alt="99x"
                  src={ninix}
                  variant="square"
                ></Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.companyName}>
                  {props.job.organization.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={classes.companyAddress}
                >
                  {props.job.location}
                </Typography>
              </Grid>
            </Grid>

            <Grid item>
              <Grid
                item
                container
                alignItems="center"
                spacing={1}
                className={classes.jobCategory}
              >
                <Grid item>
                  <WorkOutlineIcon fontSize="small"></WorkOutlineIcon>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">{props.job.type}</Typography>
                </Grid>
              </Grid>
              <Grid item container className={classes.jobCategory} spacing={3}>
                <Grid item>
                  <Typography variant="subtitle2">
                    Posted Date: {props.job.postedDate}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    Due Date: {props.job.dueDate}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography align="left" className={classes.description}>
                {props.job.description}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </FloatCard>
    </>
  );
}

export default JobSummary;
