import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Chip,
  Avatar,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../../Config";
import FloatCard from "../../../components/FloatCard";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import WorkRoundedIcon from "@material-ui/icons/WorkRounded";
import GetAppIcon from "@material-ui/icons/GetApp";
import Pending from "./pendingStatus";
import download from 'downloadjs';

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  floatcardWrapper: {
    marginBottom: theme.spacing(2),
  },
  summaryContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 8,
    marginBottom: 15,
  },
  header: {
    display: "block",
    textAlign: "left",
    margin: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  companyName: {
    textAlign: "left",
    color: theme.palette.black,
    fontWeight: 400,
  },
  jobDetailsContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  headerMain: {
    display: "flex",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    alignSelf: "left",
    marginRight: 15,
    backgroundColor: theme.palette.tagYellow,
  },
  tagIcon: {
    color: theme.palette.tagIcon,
  },
  body: {
    margin: 10,
    marginTop: 0,
    marginLeft: 0,
  },
  title: {
    fontWeight: 500,
  },
  infoTags: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
  },
  tag: {
    marginRight: 10,
    backgroundColor: "white",
  },
  headerInfo: {
    display: "block",
    marginLeft: 10,
  },
  logo: {
    borderRadius: 12,
    width: 60,
    height: 60,
  },

  shortlisted: {
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    color: theme.palette.black,
  },
  appliedContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "left",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  appliedOn:{
    fontSize: "16px",
    fontWeight: 500,
    marginRight: "10px",
  },
  appliedDate: {
    color: theme.palette.black,
  },
  downloadContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "left",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  downloadBtn: {
    background: theme.palette.tuftsBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.tuftsBlueHover,
    },
  },
}));

const Job = (props) => {
  const classes = useStyles();
  const [job, setJob] = useState("empty");
  const [applicationDetails, setApplicationDetails] = useState(
    props.applicationDetails
  );

  useEffect(() => {
    retrieveJob();
  }, []);

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${props.jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
      } else {
        console.log("404 Job not found");
      }
    } catch (err) {
      console.log("Could not retreive job");
      // console.log(err);
    }
  };

  const handleTitleClick = () => {};

  const handleResumeDownload = async () => {
    const resumeName = props.applicationDetails.resumeName;
    try {
      const response = await axios.get(`${BACKEND_URL}/resume/${props.jobId}/${props.userId}`,{
        responseType: 'blob'
      });
      console.log(response);
      return download(response.data, "Flamingo_Resume", "application/pdf");
    } catch (err) {
      console.log(err);
    }
  }

  // style={{border: "1px solid red"}}
  const displayJob = () => {
    if (job !== "empty") {
      return (
        <FloatCard>
          <Container>
            <Container className={classes.summaryContainer}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={8}>
                  <div className={classes.header}>
                    <div className={classes.headerMain}>
                      <Avatar
                        className={classes.logo}
                        src={
                          require(`../../../employer/images/${job.organization.logo}`)
                            .default
                        }
                        variant="square"
                      />
                      <div className={classes.headerInfo}>
                        <Typography
                          variant="h5"
                          className={classes.title}
                          onClick={handleTitleClick}
                        >
                          {job.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          className={classes.companyName}
                        >
                          {job.organization.name}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={classes.body}>
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
                </Grid>
                <Grid item xs={12} md={4} align="center">
                  {applicationDetails.status === "pending" && (
                    <Pending
                      applicationDetails={applicationDetails.status}
                    ></Pending>
                  )}
                </Grid>
                {/* <div>
                  <PlaylistAddCheckIcon className={classes.shortlisted} />
                </div> */}
              </Grid>
            </Container>
            <Container className={classes.jobDetailsContainer}>
              {job.description.length >= 450 && (
                <Typography>{job.description.slice(0, 450)}.....</Typography>
              )}
              {job.description.length < 450 && (
                <Typography>{job.description}</Typography>
              )}
              <div className={classes.appliedContainer}>
                <Typography className={classes.appliedDate}>
                  <span className={classes.appliedOn}>Applied on:</span> {props.applicationDetails.appliedDate.slice(0,10)}
                </Typography>
              </div>
              <div className={classes.downloadContainer}>
                <Button
                  variant="contained"
                  className={classes.downloadBtn}
                  startIcon={<GetAppIcon />}
                  onClick={handleResumeDownload}
                >
                  Download Resume
                </Button>
              </div>
            </Container>
          </Container>
        </FloatCard>
      );
    } else {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    }
  };

  return <div className={classes.floatcardWrapper}>{displayJob()}</div>;
};

export default Job;
