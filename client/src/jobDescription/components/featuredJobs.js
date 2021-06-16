import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid, Button, Avatar } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import FavoriteIcon from "@material-ui/icons/Favorite";

// custom components
import FloatCard from "../../components/FloatCard";
import ninix from "../images/99x.png";
import Organization from './../../employer/components/Organization';

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  title: {
    fontWeight: 600,
    color: theme.palette.black,
  },
  jobCardWrapper: {
    marginBottom: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(2),
  },
  postedDate: {
    textAlign: "left",
    fontSize: "15px",
  },
  favoriteIcon: {
    color: theme.palette.pinkyRed,
  },
  jobTitle: {
    textAlign: "left",
    color: theme.palette.black,
  },
  jobDescription: {
    textAlign: "left",
    marginBottom: "20px",
  },
  locationIcon: {
    color: theme.palette.tagIcon,
    fontSize: "20px",
  },
  location: {
    textAlign: "left",
    fontSize: "14px",
    color: theme.palette.tagIcon,
    marginLeft: "3px",
  },
  jobTypeIcon: {
    color: theme.palette.tagIcon,
    fontSize: "20px",
  },
  jobType: {
    textAlign: "left",
    fontSize: "14px",
    color: theme.palette.tagIcon,
    marginLeft: "4px",
  },
  companyIcon: {
    borderRadius: "12px",
    width: "30px",
    height: "auto",
  },
  companyNameContainer: {
    marginTop: "10px",
  },
  companyName: {
    fontSize: "17px",
    marginLeft: "10px",
  },
  applyButton: {
    borderRadius: 12,
    backgroundColor: theme.palette.mediumTurquoise,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlue,
    },
  },
}));

const FeaturedJobs = (props) => {
  const classes = useStyles();

  const [featuredJobs, setFeaturedJobs] = useState(props.featuredJobs);

  const displayJobDescription = (description) => {
    // const descriptionText =
    //   "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's";
    if (description.length <= 45) {
      return (
        <Typography variant="body2" className={classes.jobDescription}>
          {description}
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="body2"
          className={classes.jobDescription}
        >{`${description.slice(0, 45)}.....`}</Typography>
      );
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FloatCard>
            <Typography variant="h6" className={classes.title}>
              Featured Jobs
            </Typography>
          </FloatCard>
        </Grid>

        <Grid item container xs={12} justify="space-around">
          {featuredJobs.map((job) => (
            <Grid key={job._id} item xs={12} md={5} lg={12} className={classes.jobCardWrapper}>
              <FloatCard>
                <Container className={classes.container}>
                  <Grid container>
                    <Grid item container xs={12} alignItems="center">
                      <Grid item xs={10}>
                        <Typography className={classes.postedDate}>
                          6 Days ago
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={2}
                        className={classes.favoriteIcon}
                        direction="column"
                        justify="center"
                        alignItems="flex-end"
                      >
                        <FavoriteIcon />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography className={classes.jobTitle} variant="h6">
                        {job.title}
                      </Typography>
                    </Grid>

                    <Grid item>{displayJobDescription(job.description)}</Grid>

                    <Grid item container xs={12} spacing={2}>
                      <Grid item container xs={6}>
                        <Grid item xs={2}>
                          <LocationOnIcon className={classes.jobTypeIcon} />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography
                            alignItems="center"
                            className={classes.location}
                          >
                            {job.location}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item container xs={6}>
                        <Grid item xs={2}>
                          <WorkIcon className={classes.jobTypeIcon} />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography className={classes.jobType}>
                            {job.type}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      container
                      className={classes.companyNameContainer}
                    >
                      <Grid item container xs={9} alignItems="center">
                        <Grid item>
                          <Avatar
                            alt="99x"
                            src={ninix}
                            className={classes.companyIcon}
                          ></Avatar>
                        </Grid>
                        <Grid item>
                          <Typography className={classes.companyName}>
                            {job.organization.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid xs={3} item>
                        <Button
                          variant="contained"
                          className={classes.applyButton}
                        >
                          Apply
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </FloatCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default FeaturedJobs;
