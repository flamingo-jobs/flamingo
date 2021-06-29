import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { Avatar, Button, Chip, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import FloatCard from '../../components/FloatCard';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import {
  Grid,
  Container,
} from "@material-ui/core";
import ninix from "../images/99x.png";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  summaryContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 8,
    marginBottom: 15,
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
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  applyBtn: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.mediumTurquoise,
    }
  },
  savBtn: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: 'transparent',
    color: theme.palette.tuftsBlue,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
    }
  },
  header: {
    display: 'block',
    textAlign: "left",
    margin: 10,
    marginLeft: 0
  },
  headerMain: {
    display: 'flex',
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20
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
    color: theme.palette.pinkyRed
  },
  body: {
    margin: 10,
    marginLeft: 0
  },
  title: {
    fontWeight: 500,
  },
  companyName: {
    fontWeight: 400,
  },
  infoTags: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center'
  },
  tag: {
    marginRight: 10,
    backgroundColor: 'white',
  },
  headerInfo: {
    display: 'block',
    marginLeft: 10
  },
  logo: {
    borderRadius: 12,
    width: 60,
    height: 60
  },
}));

function JobSummary(props) {
  const classes = useStyles();

  return (
    <Container>
      <Container className={classes.summaryContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <div className={classes.header}>
              <div className={classes.infoTags} style={{ marginTop: 0 }}>
                <Chip icon={<LocalOfferRoundedIcon className={classes.tagIcon} />} label={props.job.category} className={classes.label} />
                <Typography className={classes.time}><ReactTimeAgo date={props.job.postedDate} locale="en-US" /></Typography>
              </div>
              <div className={classes.headerMain}>
                <Avatar className={classes.logo} src={require(`../../employer/images/${props.job.organization.logo}`).default} variant="square" />
                <div className={classes.headerInfo}>
                  <Typography variant="h5" className={classes.title} >{props.job.title}</Typography>
                  <Typography variant="h6" className={classes.companyName} >{props.job.organization.name}</Typography>
                </div>
              </div>

            </div>
            <div className={classes.body} >

              <div className={classes.infoTags}>
                <Chip icon={<LocationOnRoundedIcon />} label={props.job.location} className={classes.tag} />
                <Chip icon={<WorkRoundedIcon />} label={props.job.type} className={classes.tag} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Button
              href="#applyForm"
              className={classes.savBtn}
            >
              <BookmarkBorderRoundedIcon />Save for later
            </Button>
            <Button
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
