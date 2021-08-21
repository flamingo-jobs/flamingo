import React from "react";
import { makeStyles, Avatar, Typography, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import Box from "@material-ui/core/Box";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ApplicantImage from "../images/1.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  peopleIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 20,
  },
  applicantContainer: {
    marginTop: 10,
    padding: 5,
    marginBottom: -10,
  },
  applicantName: {
    float: "left",
    marginTop: -5,
  },
  avatar: {
    marginLeft: 5,
  },
  applicantBody: {
    marginTop: -15,
    marginLeft: -2,
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
        return res.data.jobseeker.slice(0,3);
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


  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          New Applicants
        </Typography>
        <PeopleAltIcon className={classes.peopleIcon} />

        {Array.from(allJobs).map((job, i) => (
          <Grid
            container
            direction="row"
            xs={12}
            className={classes.applicantContainer}
          >
            <Grid item xs={3} alignContent="right" style={{marginTop:-5}}>
              <Avatar
                alt={job.name}
                src={ApplicantImage}
                className={classes.avatar}
              />
            </Grid>
            <Grid item direction="column" container xs={9} style={{marginTop:-5}}>
              <Grid item>
                <Typography variant="body2" className={classes.applicantName}>
                  <Box fontWeight={500} fontSize={12} m={1}>
                    {job.name}
                  </Box>
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body2" className={classes.applicantBody}>
                  <Box fontWeight={400} fontSize={10} m={1}>
                    Applied for {job.job}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}

        <Link to={`/employer/resumes`}>
          <Button className={classes.button}>View All</Button>
        </Link>
      </FloatCard>
    </div>
  );
};

export default NewApplicants;