import {
  Button, Card,
  CardContent, IconButton, Modal, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { StateBlueTextField } from "./CustomTextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    maxHeight: "98vh",
    overflowY: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewTopBar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  closeButton: {
    width: "20px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#888",
    "&:hover": {
      color: "#555",
    },
  },
  text: {
    marginBottom: theme.spacing(1),
  },
  form: {
    width: "100%",
  },
  rating: {
    marginTop: theme.spacing(3),
    display: "flex",
  },
  ratingText: {
    marginRight: theme.spacing(1),
  },
  reviewErrorContainer:{
    padding:"0px",
    fontSize: "12px",
  },
  reviewError:{
    margin:"0px",
    color: "#f44336 ",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cancelBtn: {
    background: "#e8e8e4",
    color: theme.palette.black,
    "&:hover": {
      background: "#e8e8e4",
      color: theme.palette.black,
    },
  },
  submitBtn: {
    marginLeft: "10px",
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.stateBlue,
      color: theme.palette.white,
    },
  },
}));

// style={{border: "1px solid red"}}
const ReviewModal = (props) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <div className={classes.reviewTopBar}>
              <div className={classes.reviewTitle}>
                <Typography variant="h6">
                  Review by {props.jobseeker.name}
                </Typography>
              </div>
              <IconButton
                onClick={props.handleClose}
                className={classes.closeButton}
              >
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </div>

            <div className={classes.formContainer}>
              <Typography variant="subtitle1" className={classes.text}>
                Reviews are public and editable.
              </Typography>
              <form onSubmit={props.handleReviewSubmit}>
                <StateBlueTextField
                  id="review"
                  name="review"
                  label="Review"
                  variant="outlined"
                  fullWidth
                  multiline
                  value={props.review}
                  onChange={props.handleReviewChange}
                  error={props.errors.hasOwnProperty("review")}
                  helperText={props.errors["review"]}
                />
                <div className={classes.rating}>
                  <Typography className={classes.ratingText}>
                    Rating:{" "}
                  </Typography>
                  <Rating
                    id="rating"
                    name="rating"
                    value={props.rating}
                    onChange={(e, newRating) => props.handleRatingChange(e, newRating)}
                  />
                </div>
                <div className={classes.reviewErrorContainer}>
                  <p className={classes.reviewError}>{props.errors["rating"]}</p>
                </div>

                <div className={classes.btnContainer}>
                  <Button
                    
                    className={classes.cancelBtn}
                    onClick={() => props.handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    
                    type="submit"
                    className={classes.submitBtn}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default ReviewModal;
