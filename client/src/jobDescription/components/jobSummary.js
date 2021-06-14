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
  },
  companyName: {
    textAlign: "left",
  },
  companyAddress: {
    textAlign: "left",
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

const JobSummary = ({
  title,
  organization,
  location,
  type,
  postedDate,
  dueDate,
  description,
}) => {
  const classes = useStyles();

  return (
    <Container>
      <Container maxWidth="lg" className={classes.summaryContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" className={classes.jobTitle}>
              {title}
            </Typography>
            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt="99x" src={ninix} variant="square"></Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.companyName}>
                  {/* {organization.name} */}
                  wwwwwwwwww
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={classes.companyAddress}
                >
                  {location}
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
                  <Typography variant="subtitle2">{type}</Typography>
                </Grid>
              </Grid>
              <Grid item container className={classes.jobCategory} spacing={3}>
                <Grid item>
                  <Typography variant="subtitle2">
                    Posted Date: {postedDate}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    Due Date: {dueDate}
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
        <Typography>{description}</Typography>
      </Container>
    </Container>
  );
};

export default JobSummary;
