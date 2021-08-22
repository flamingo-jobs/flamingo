import React from "react";
import { makeStyles, Avatar, Typography, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../../../components/FloatCard";
import Box from "@material-ui/core/Box";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ApplicantImage from "../images/1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";
import theme from "../../../../Theme";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
  },
  applicantName: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 500
  },
  avatar: {
    borderRadius: 12
  },
  applicantBody: {
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 400

  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    margin: 22,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    },
  },
}));

const NewApplicants = (props) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  const getUserData = (userId) => {
    axios.get(`${BACKEND_URL}/jobseeker/${userId}`).then((res) => {
      if (res.data.success) {
        return res.data.jobseeker.slice(0, 3);
      }

      return "hi";
    });
  };

  useEffect(() => {
    axios.get(`${BACKEND_URL}/applications/${props.employerId}`).then((res) => {
      console.log(res.data.applications);
      if (res.data.success) {
        setState({
          allJobs: res.data.applications,
        });
      }
    });
  }, []);

  const loadProfilePic = () => {
    try {
      return require(`../../../../employee/images/`).default
    } catch (err) {
      return require(`../../../../employee/images/profilePic.jpg`).default
    }
  }
  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch" style={{padding: 8}}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.title}>
              New Applicants
            </Typography>
          </Grid>
          {Array.from(allJobs).map((job, i) => (
            <Grid item xs={12}>
              <FloatCard backColor={theme.palette.lightSkyBlueHover}>
                <Grid item container direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Grid item xs={3} lg={2}>
                    <Avatar className={classes.avatar} src={loadProfilePic()} variant="square" />
                  </Grid>
                  <Grid item xs={9} lg={10}>
                    <Typography variant="body2" className={classes.applicantName}>
                      {job.name}
                    </Typography>
                    <Typography variant="body2" className={classes.applicantBody}>
                      Applied for <strong>{job.job}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </FloatCard>
            </Grid>

          ))}
        </Grid>
        <Link to={`/employer/resumes`}>
          <Button className={classes.button}>View All</Button>
        </Link>
      </FloatCard>
    </div>
  );
};

export default NewApplicants;