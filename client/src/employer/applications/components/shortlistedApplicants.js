import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PeopleIcon from "@material-ui/icons/People";
import Tooltip from "@material-ui/core/Tooltip";
import FloatCard from "../../../components/FloatCard";
import ApplicantCard from "./applicantCard";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  shortlistBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  shortlistBtn: {
    padding: 16,
    borderRadius: 12,
    color: theme.palette.white,
    backgroundColor: theme.palette.vividSkyBlue,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
  },
  shortlistEveryoneBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  shortlistEveryoneBtn: {
    padding: 12,
    borderRadius: 12,
    color: theme.palette.white,
    backgroundColor: theme.palette.vividSkyBlue,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
  },
  applicantTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  applicantTitleText: {
    color: theme.palette.vividSkyBlue,
  },
  shorlistTitle: {
    marginBottom: theme.spacing(2),
  },
  shorlistTitleText: {
    color: theme.palette.stateBlue,
  },
  peopleGrid: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "unset",
      flexDirection: "column",
      alignItems: "stretch",
      order: 3,
    },
  },
  mainGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  filterGrid: {
    [theme.breakpoints.down("sm")]: {
      order: 2,
    },
  },
  searchGrid: {
    [theme.breakpoints.down("sm")]: {
      order: 1,
    },
  },
  pagination: {
    justifyContent: "center",
  },
  gridCard: {
    display: "grid",
    marginBottom: 12,
  },
  titleCard: {
    marginTop: 24,
    marginBottom: 16,
  },
}));

const ShortlistedApplicants = (props) => {
  const classes = useStyles();

  const [test, setTest] = useState("Yeshan")
  const [shortlistedJobseekers, setShortlistedJobseekers] = useState(
    props.shortlistedJobseekers
  );
  const [otherJobseekers, setOtherJobseekers] = useState(props.otherJobseekers);
  const [allShortlisted, setAllShortlisted] = useState(false);

  const shortlistMatchedApplicants = (jobseekers) => {
    const ids = jobseekers.map((j) => j._id);
    var newScoredApplicants = [...shortlistedJobseekers];
    
    newScoredApplicants = newScoredApplicants.map((a) => {
      if (ids.includes(a._id)) {
        a.applicationDetails.map((b) => {
          if (b.jobId === props.jobId) {
            b.status = "shortlisted";
          }
        });
      }
      return a;
    });
    // console.log("qq", newScoredApplicants)
    setTest("GGGGGG")
    setShortlistedJobseekers(newScoredApplicants);
  };

  return (
    <>
      <Grid item xs={12} className={classes.titleCard} style={{ marginTop: 0 }}>
        <FloatCard>
          <Typography className={classes.shorlistTitleText} variant="h6">
            Shortlisted Applicants {test}
          </Typography>
        </FloatCard>
      </Grid>

      <Grid item xs={12}>
        <div className={classes.shortlistEveryoneBtnContainer}>
          <Tooltip title="This will shortlist everyone who has been matched.">
            <Button
              className={classes.shortlistEveryoneBtn}
              startIcon={<PeopleIcon />}
              onClick={() => shortlistMatchedApplicants(shortlistedJobseekers)}
            >
              Shortlist everyone
            </Button>
          </Tooltip>
        </div>
      </Grid>

      {shortlistedJobseekers.map((user) => (
        <Grid item key={user._id} xs={12} className={classes.gridCard}>
          <ApplicantCard
            key={user._id}
            jobseeker={user}
            jobId={props.jobId}
            setAlertData={props.setAlertData}
            handleAlert={props.handleAlert}
          ></ApplicantCard>
        </Grid>
      ))}

      {otherJobseekers.length !== 0 && (
        <Grid item xs={12} className={classes.titleCard}>
          <FloatCard>
            <Typography className={classes.shorlistTitleText} variant="h6">
              Other Applicants
            </Typography>
          </FloatCard>
        </Grid>
      )}

      {otherJobseekers.map((user) => (
        <Grid item key={user._id} xs={12} className={classes.gridCard}>
          <ApplicantCard
            key={user._id}
            jobseeker={user}
            jobId={props.jobId}
            setAlertData={props.setAlertData}
            handleAlert={props.handleAlert}
          ></ApplicantCard>
        </Grid>
      ))}
    </>
  );
};

export default ShortlistedApplicants;
