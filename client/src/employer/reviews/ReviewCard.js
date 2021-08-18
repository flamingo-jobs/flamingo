import React, { useState, useEffect } from "react";
import FloatCard from "../../components/FloatCard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  borderBottom: {
    borderBottom: `1px solid ${"#eee"}`,
  },
  topbar: {
    marginBottom: theme.spacing(1),
  },
  name: {
    textAlign: "left",
  },
  description: {
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  userIcon: {
    height: "40px",
    width: "40px",
    color: theme.palette.stateBlue,
  },
  ratingRow: {
    display: "flex",
    justifyContent: "flex-start",
  },
  rating: {
    display: "flex",
    justifyContent: "flex-start",
    marginRight: theme.spacing(1),
  },
  date: {
    fontSize: "12px",
    color: "#888",
  },
  starIcon: {
    fontSize: "15px",
  },
}));

const ReviewCard = (props) => {
  const classes = useStyles();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log("date", new Date(props.review.createdDate).getMonth());

  const date = new Date(props.review.createdDate);
  // style={{border: "1px solid red"}}
  return (
    <div
      className={`${classes.root} ${
        props.index !== props.reviewsLength - 1 && classes.borderBottom
      }`}
    >
      <div className={classes.topbar}>
        <Grid container>
          <Grid item xs={1}>
            <div className={classes.iconContainer}>
              <AccountCircleIcon className={classes.userIcon} />
            </div>
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.name}>
              {props.review.jobseekerName}
            </Typography>
            <div className={classes.ratingRow}>
              <div className={classes.rating}>
                <Rating
                  name="rating"
                  value={props.review.rating}
                  readOnly
                  icon={<StarIcon className={classes.starIcon} />}
                />
              </div>
              <div>
                <Typography className={classes.date}>{`${date.getDate()}, ${
                  monthNames[date.getMonth()]
                }, ${date.getFullYear()}`}</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={classes.description}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Typography>{props.review.review}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ReviewCard;
