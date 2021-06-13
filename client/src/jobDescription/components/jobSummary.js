import React from "react";
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


const testStyles = makeStyles((theme) => ({
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
  companyName:{
    textAlign: "left",
  },
  companyAddress:{
    textAlign: "left",
  },
  jobCategory: {
    color: "#aaa",
  },
  jobDetailsContainer: {
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
}));

const JobSummary = () => {
  const {
    border,
    summaryContainer,
    jobTitle,
    companyName,
    companyAddress,
    jobCategory,
    jobDetailsContainer,
  } = testStyles();

  return (
    <Container>
      <Container maxWidth="lg" className={summaryContainer}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item  xs={12} md={8} >
            <Typography variant="h5" className={jobTitle}>
              Software Engineer
            </Typography>
            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt="99x" src={ninix} variant="square"></Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={companyName}>99X Services Ltd.</Typography>
                <Typography variant="subtitle2" className={companyAddress}>
                  65, Walukarama Rd, Colombo 03
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                item
                container
                alignItems="center"
                spacing={1}
                className={jobCategory}
              >
                <Grid item>
                  <WorkOutlineIcon fontSize="small"></WorkOutlineIcon>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">Full-Time</Typography>
                </Grid>
              </Grid>
              <Grid item container className={jobCategory}>
                <Grid item>
                  <Typography variant="subtitle2">
                    Posted: 7 days ago
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <Button variant="contained" color="primary" href="#applyForm">
              Apply For This Job
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container className={jobDetailsContainer}>
        <Typography>
          KAR Global is looking to expand our development team as we continue to
          innovate within the used car industry. The candidate should have a
          strong background in Java Web Service development and be comfortable
          using the Spring Framework. As an engineer on the development team the
          main responsibilities are design, implementation, and maintenance of
          RESTful web services in both Composite service and Microservice forms.
          ‪The candidate should have good communication skills and be able to
          work closely with Product Owners to discuss feasibility of technical
          considerations as well as provide accurate estimates for project
          completion.
        </Typography>
      </Container>
    </Container>
  );
};

export default JobSummary;
