import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

import {
  Typography,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  Avatar,
} from "@material-ui/core";
import ninix from "../images/99x.png";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  summaryContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
  applyBtn: {
    borderRadius: 12,
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.blueJeans,
    },
  },
}));

function JobSummary(props) {
  const classes = useStyles();

  return (
    <Container>
      <Container className={classes.summaryContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
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
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Button
              variant="contained"
              href="#applyForm"
              className={classes.applyBtn}
            >
              Apply For This Job
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.jobDetailsContainer}>
        <Typography>{props.job.description}</Typography>
      </Container>
    </Container>
  );
}

export default JobSummary;
