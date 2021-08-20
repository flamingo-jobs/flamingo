import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import BACKEND_URL from "../../Config";
import axios from "axios";
import ReviewModal from "./ReviewModal";
import ReviewCard from "./ReviewCard";
import SnackBarAlert from "../../components/SnackBarAlert";
import Lottie from "react-lottie";
import Rating from "./lotties/rating.json";

const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  reviewTitle:{
    color: theme.palette.stateBlue,
  },
  writeBtn: {
    backgroundColor: theme.palette.white,
    color: theme.palette.stateBlue,
    "&:hover": {
      transition: "0.3s",
      backgroundColor: theme.palette.stateBlueHover,
      color: "white",
    },
    transition: "0.3s",
  },
  lottieContainer:{
    marginTop: theme.spacing(2),
  },
  reviewText:{
    fontWeight: 400,
  },
}));

const Reviews = (props) => {
  const classes = useStyles();

  const userId = sessionStorage.getItem("loginId");
  const isSignedIn = sessionStorage.getItem("userToken") ? true : false;

  const [reviews, setReviews] = useState("empty");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [jobseeker, setJobseeker] = useState("empty");

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.userRole
      : null
  );

  const ratingOptions = {
    loop: true,
    autoplay: true,
    animationData: Rating,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Error related stuff
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  // Review modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleReviewModal = () => {
    handleOpen();
  };

  useEffect(() => {
    retrieveEmployer();
  }, [props.empId]);

  useEffect(() => {
    retrieveJobseeker();
  }, []);

  const retrieveEmployer = async () => {
    try {
      if (props.empId) {
        const response = await axios.get(
          `${BACKEND_URL}/employers/${props.empId}`
        );
        if (response.data.success) {
          if (response.data.employer.reviews.length !== 0) {
            setReviews(response.data.employer.reviews);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveJobseeker = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
      if (response.data.success) {
        setJobseeker(response.data.jobseeker);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const data = {
      review: review,
      rating: rating,
      createdDate: new Date(),
      jobseekerId: jobseeker._id,
      jobseekerName: jobseeker.name,
    };

    try {
      if (jobseeker !== "empty") {
        const data = {
          review: review,
          rating: rating,
          createdDate: new Date(),
          jobseekerId: jobseeker._id,
          jobseekerName: jobseeker.name,
        };
        console.log("data", data);
        const response = await axios.patch(
          `${BACKEND_URL}/employers/addReview/${props.empId}`,
          data
        );

        if (response.data.success) {
          handleClose();
          setAlertData({
            severity: "success",
            msg: "Review posted, successfully!",
          });
          handleAlert();
        }
      }
    } catch (err) {
      handleClose();
      setAlertData({
        severity: "error",
        msg: "Review could not be posted",
      });
      handleAlert();
      console.log(err);
    }
  };

  const displayReviewModal = () => {
    if (isSignedIn && role === "jobseeker" && jobseeker !== "empty") {
      return (
        <ReviewModal
          open={open}
          handleClose={handleClose}
          review={review}
          rating={rating}
          setReview={setReview}
          setRating={setRating}
          handleReviewSubmit={handleReviewSubmit}
          jobseeker={jobseeker}
        ></ReviewModal>
      );
    }
  };

  const displayReviewCards = () => {
    if (reviews !== "empty") {
      return (
        <div className={classes.reviews}>
          {reviews.map((review, index) => (
            <ReviewCard
              key={review._id}
              review={review}
              index={index}
              reviewsLength={reviews.length}
            ></ReviewCard>
          ))}
        </div>
      );
    } else {
      return (
        <div className={classes.lottieContainer} >
          <Lottie options={ratingOptions} width="400px" />
          <Typography className={classes.reviewText} variant="subtitle1">There are no reviews yet.</Typography>
        </div>
      );
    }
  };
  // style={{border: "1px solid red"}}

  return (
    <FloatCard>
      {displayAlert()}
      {displayReviewModal()}
      <div className={classes.root}>
        <div className={classes.topBar}>
          <Typography className={classes.reviewTitle} variant="h6">Reviews</Typography>
          {isSignedIn && role === "jobseeker" && (
            <Button
              variant="contained"
              className={classes.writeBtn}
              startIcon={<EditIcon />}
              onClick={handleReviewModal}
            >
              Write a review
            </Button>
          )}
        </div>
        {displayReviewCards()}
      </div>
    </FloatCard>
  );
};

export default Reviews;
